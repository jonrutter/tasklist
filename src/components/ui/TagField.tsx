import React from 'react';

// components
import {
  Box,
  Button,
  IconButton,
  Popover,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Divider,
  Tooltip,
} from '@mui/material';
import { ListHeader } from './ListHeader';

// icons
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';

// store
import { useSelector } from '@/app';
import { selectTagById, selectTagIds } from '@/features/tags';

// colors
import { colors } from '@/data/colors';

// hooks
import { usePopover } from '@/hooks/usePopover';

// child components
type TagItemProps = {
  id: string;
  onClick: (_: string) => void;
};

/** Displays a single tag list item */
const TagListItem: React.FC<TagItemProps> = ({ id, onClick }) => {
  const tag = useSelector(selectTagById(id));
  if (!tag) return null;
  return (
    <ListItem key={tag.id} sx={{ p: 0 }}>
      <ListItemButton onClick={() => onClick(tag.id)}>
        <ListItemIcon>
          <LocalOfferIcon
            sx={{
              color: tag.color
                ? colors[tag.color as keyof typeof colors]
                : 'grey',
            }}
          />
        </ListItemIcon>
        <ListItemText>{tag.name}</ListItemText>
      </ListItemButton>
    </ListItem>
  );
};

type Props = {
  value: string | undefined;
  onChange: React.Dispatch<React.SetStateAction<string | undefined>>;
};

/** A input to handle adding a tag to a task */
export const TagField: React.FC<Props> = ({ value, onChange }) => {
  const [anchor, handleOpen, handleClose, open] = usePopover();
  const tagIds = useSelector(selectTagIds);

  const activeTag = useSelector(selectTagById(value));

  const handleClick = (tag: string) => {
    onChange(tag);
    handleClose();
  };

  const clearTag = () => {
    onChange(undefined);
    handleClose();
  };

  const id = open ? 'tag-popup' : undefined;

  return (
    <Box>
      {activeTag ? (
        <Tooltip title="Update Tag">
          <Button
            aria-label="Update Tag"
            onClick={handleOpen}
            sx={(theme) => ({
              color: theme.palette.text.primary,
              textTransform: 'capitalize',
              fontWeight: 'normal',
              '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
            })}
            startIcon={
              <LocalOfferIcon
                sx={{
                  color: activeTag.color
                    ? colors[activeTag.color as keyof typeof colors]
                    : 'grey',
                }}
              />
            }
          >
            {activeTag.name}
          </Button>
        </Tooltip>
      ) : (
        <Tooltip title="Set Tag">
          <IconButton aria-label="Set tag" onClick={handleOpen}>
            <LocalOfferOutlinedIcon />
          </IconButton>
        </Tooltip>
      )}
      <Popover
        id={id}
        data-testid={id}
        open={open}
        anchorEl={anchor}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <List>
          <ListHeader>Tag</ListHeader>
          <Divider />
          {tagIds.map((id) => (
            <TagListItem key={id} id={id} onClick={handleClick} />
          ))}
          <Divider />
          <ListItem key={id} sx={{ p: 0 }}>
            <ListItemButton onClick={clearTag}>
              <ListItemIcon>
                <DoNotDisturbAltIcon />
              </ListItemIcon>
              <ListItemText>No Tag</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </Popover>
    </Box>
  );
};
