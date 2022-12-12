import React, { useState } from 'react';

// components
import { ListItem, ListItemText, IconButton, Tooltip } from '@mui/material';
import { CollapseList } from '@/components/ui/CollapseList';
import { NavTagItem } from './NavTagItem';
import { CustomDialog } from '@/components/ui/CustomDialog';

// tags
import { selectTags, CreateTag } from '@/features/tags';

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
  const tags = useSelector(selectTags);
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
        {tags.length ? (
          <div>
            {tags.map((tag) => (
              <NavTagItem tag={tag} key={tag.id} />
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
