import IsLoggedInTopBarButtons from './IsLoggedInTopBarButtons';
import IsLoggedInBottomBarButtons from './IsLoggedInBottomBarButtons';

interface IsLoggedInButtonsProps {
    bar: 'top' | 'bottom',
}

function IsLoggedInButtons({bar}:IsLoggedInButtonsProps) {
    
    return (
        <>
            {
                bar === 'top' 
                ? <IsLoggedInTopBarButtons />
                : ''
            }

            {   
                bar === 'bottom' 
                ? <IsLoggedInBottomBarButtons />
                : ''
            }

        </>
    )
}

export default IsLoggedInButtons;