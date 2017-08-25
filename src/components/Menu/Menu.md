
Example:

    const handleClick = (e) => {
      console.log('click', e);
    };

    <Menu onClick={handleClick} style={{ width: 240 }} mode="inline" >
        <SubMenu key="sub1" title={<span>Navigation One</span>}>
          <MenuItem key="1">Option 1</MenuItem>
          <MenuItem key="2">Option 2</MenuItem>
          <MenuItem key="3">Option 3</MenuItem>
          <MenuItem key="4">Option 4</MenuItem>
        </SubMenu>
        <SubMenu key="sub2" title={<span>Navigation Two</span>}>
          <MenuItem key="5">Option 5</MenuItem>
          <MenuItem key="6">Option 6</MenuItem>
        </SubMenu>
    </Menu>
