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
import { selectTags } from '@/features/tags';

// colors
import { colors } from '@/data/colors';

// hooks
import { usePopover } from '@/hooks/usePopover';

// types
import type { TagType } from '@/features/tags';

type Props = {
  tag: TagType | undefined;
  setTag: React.Dispatch<React.SetStateAction<TagType | undefined>>;
};

/**
 * A form control to handle adding a tag to a task.
 */
export const TagField: React.FC<Props> = ({ tag, setTag }) => {
  const [anchor, handleOpen, handleClose, open] = usePopover();
  const tags = useSelector(selectTags);

  const handleClick = (tag: TagType) => {
    setTag(tag);
    handleClose();
  };

  const clearTag = () => {
    setTag(undefined);
    handleClose();
  };

  const id = open ? 'tag-popup' : undefined;

  return (
    <Box>
      {tag ? (
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
                  color: tag.color
                    ? colors[tag.color as keyof typeof colors]
                    : 'grey',
                }}
              />
            }
          >
            {tag.name}
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
          {tags.map((tag) => (
            <ListItem key={tag.id} sx={{ p: 0 }}>
              <ListItemButton onClick={() => handleClick(tag)}>
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
