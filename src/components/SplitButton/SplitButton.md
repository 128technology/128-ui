Example: 

    const List = require('@material-ui/core/List').default;
    const ListItem = require('@material-ui/core/ListItem').default;

    const menu = (
      <List>
        <ListItem dense={true}>An Item</ListItem>
      </List>
    );

      <SplitButton popoverContent={menu}>Dropdown</SplitButton>

Example (Disabled):

    const List = require('@material-ui/core/List').default;
    const ListItem = require('@material-ui/core/ListItem').default;

    const menu = (
      <List>
        <ListItem dense={true}>An Item</ListItem>
      </List>
    );
    
      <SplitButton variant="raised" disabled={true} popoverContent={menu}>Dropdown</SplitButton>
