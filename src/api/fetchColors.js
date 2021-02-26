import React from 'react';

export function fetchColors () {
    axiosWithAuth()
    .get('/api/colors')
    .then(res => {
      return res.data;
    })
  };