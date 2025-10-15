
const getTileColor = (value) => {
  const colors = {
    0: '#CDC1B4',
    2: '#EEE4DA',
    4: '#EDE0C8',
    8: '#F2B179',
    16: '#F59563',
    32: '#F67C5F',
    64: '#F65E3B',
    128: '#EDCF72',
    256: '#EDCC61',
    512: '#EDC850',
    1024: '#EDC53F',
    2048: '#EDC22E',
  };
  return colors[value] || '#3C3A32';
};

const getFontSize = (value) => {
  if (value < 100) return '2rem';
  if (value < 1000) return '1.75rem';
  if (value < 10000) return '1.5rem';
  return '1.25rem';
};

const Tile = ({ value }) => {
  return (
    <div
      className="flex items-center justify-center font-bold rounded-lg transition-all duration-150"
      style={{
        backgroundColor: getTileColor(value),
        color: value <= 4 ? '#776E65' : '#F9F6F2',
        fontSize: getFontSize(value),
        width: '80px',
        height: '80px',
      }}
    >
        
      {value !== 0 ? value : ''}
    </div>
  );
};

export default Tile;
