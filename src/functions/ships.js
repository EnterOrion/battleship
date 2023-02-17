const shipFactory = (length) => {
    let shipHealth = length; 
    const hit = () => {
        shipHealth--;
    }
    const isSunk = () => {
        if(shipHealth == 0) {
            return true;
        }
        else {
            return false;
        }
    }

    return {
        length,
        hit, 
        isSunk
    }
    
}

export default shipFactory;