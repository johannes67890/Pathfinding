import { useThree } from '@react-three/fiber'
import { Button } from 'flowbite-react';
import React from 'react'
// https://jsfiddle.net/a3ns02b5/
const SaveImage = () => {
    const createImg = () => {
        const {gl} = useThree();
    
        const url = gl.domElement.toDataURL();
    
        const link = document.createElement('a');
    
        link.setAttribute('href', url);
        link.setAttribute('target', '_blank');
        link.setAttribute('download', "test.png");
    
        link.click();
      }
  return (
    <Button onClick={createImg}>Save Image</Button>
  )
}
export default SaveImage