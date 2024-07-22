import React from "react";



/**
 * AppContexts 
 * @param 
 * @returns 
 */
const GraphContexts: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <>
        {children}
    </>
        
  );
};

export default GraphContexts;