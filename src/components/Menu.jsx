import { useState, Fragment } from "react";

import { Menu, Box } from "@material-ui/core";

function CustomMenu({ trigger: MenuTrigger, children, ...props }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Fragment>
      <Box onClick={handleClick}>
        <MenuTrigger />
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        keepMounted
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        getContentAnchorEl={null}
        {...props}
      >
        {children}
      </Menu>
    </Fragment>
  );
}

export default CustomMenu;
