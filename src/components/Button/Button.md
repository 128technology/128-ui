Example:

    const { MuiThemeProvider, createMuiTheme } = require('@material-ui/core/styles');
    const Immutable = require('immutable');

    <MuiThemeProvider theme={createMuiTheme()}>
      <Button onClick={() => alert(1)} variant="raised">Click Me</Button>
    </MuiThemeProvider>

Example (Disabled):

    const { MuiThemeProvider, createMuiTheme } = require('@material-ui/core/styles');
    const Immutable = require('immutable');

    <MuiThemeProvider theme={createMuiTheme()}>
      <Button disabled={true} onClick={() => alert(1)} variant="raised">Click Me</Button>
    </MuiThemeProvider>
