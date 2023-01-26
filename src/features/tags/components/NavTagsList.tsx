import React, { useState } from 'react';

// components
import { ListItem, ListItemText, IconButton, Tooltip } from '@mui/material';
import { CollapseList } from '@/components/ui/CollapseList';
import { NavTagItem } from './NavTagItem';
import { CustomDialog } from '@/components/ui/CustomDialog';

// tags
import { selectTagIds, CreateTag } from '@/features/tags';

// store
import { useSelector } from '@/app';

// types
import AddIcon from '@mui/icons-material/Add';

type ButtonProps = {
  onClick: () => void;
};

const AddTagButton: React.FC<ButtonProps> = ({ onClick }) => (
  <Tooltip title="New Tag">
    <IconButton edge="end" aria-label="new tag" onClick={onClick}>
      <AddIcon />
    </IconButton>
  </Tooltip>
);

/**
 * A modified NavList for rendering NavTags.
 */
export const NavTagsList = () => {
  const tagIds = useSelector(selectTagIds);
  const [editing, setEditing] = useState(false);

  const handleAddTag = () => {
    setEditing(true);
  };
  const handleClose = () => {
    setEditing(false);
  };

  return (
    <>
      <CollapseList
        label="Tags"
        secondaryAction={<AddTagButton onClick={handleAddTag} />}
      >
        {tagIds.length ? (
          <div>
            {tagIds.map((id) => (
              <NavTagItem id={id} key={id} />
            ))}
          </div>
        ) : (
          <ListItem>
            <ListItemText primary="You don't have any tags yet. Press the button to create some!" />
          </ListItem>
        )}
      </CollapseList>
      <CustomDialog open={editing} onClose={handleClose}>
        <CreateTag onDiscard={handleClose} onClose={handleClose} />
      </CustomDialog>
    </>
  );
};
