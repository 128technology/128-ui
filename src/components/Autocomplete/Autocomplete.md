Example:

    const options = [1, 2, 3, 4].map((index) => ({
      label: 'Option ' + index,
      value: index
    }));

    const onSelect = (selection) => { console && console.log('Selection: '+selection) };

    <div style={{width: '300px'}}>
      <Autocomplete placeholder="Type or select..." options={options} onSelect={onSelect} />
    </div>
