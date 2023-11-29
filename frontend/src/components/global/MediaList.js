import React from 'react';

const MediaList = ({ media, title }) => {
  const displayedMedia = media.slice(0, 5);

  return (
    <div style={mediaListStyle}>
      {displayedMedia.map((item) => (
        <div key={item.id} style={mediaItemStyle}>
          <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.title || item.name} style={imgStyle} />
          <p className='mediaTitle'>{item.title || item.name}</p>
        </div>
      ))}
    </div>
  );
};

const mediaListStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
};

const mediaItemStyle = {
  width: '18%',
  marginBottom: '5px',
  boxSizing: 'border-box',
};

const imgStyle = {
  width: '100%',
  height: 'auto',
  borderRadius: '12px',
};

export default MediaList;
