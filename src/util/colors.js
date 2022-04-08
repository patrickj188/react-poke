export const getTypeColor = (type) => {
    const map = {
      grass: 'lime',
      poison: 'grape',
      fire: 'orange',
      fighting: 'red',
      water: 'blue',
      steel: 'gray',
      fairy: 'pink',
      ghost: 'indigo',
      psychic: 'indigo',
      dark: 'grape',
      bug: 'lime',
      ice: 'cyan',
      dragon: 'indigo',
      electric: 'yellow',
    };
  
    return map[type.toLowerCase()] || 'gray';
  };