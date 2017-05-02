Example:

    const options = [1, 2, 3, 4].map((index) => ({
      label: 'Option ' + index,
      value: index
    }));

    const onSelect = (selection) => { console && console.log('Selection: '+selection) };

    <Autocomplete placeholder="Type or select..." options={options} onSelect={onSelect} />
