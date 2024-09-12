import { useId } from 'react';
import { useTheme } from '@/prodivers/theme/themeContext';
import { Sun, Moon } from 'lucide-react';

const ThemeSwitch = () => {
  const id = useId()
  const {theme, toggleTheme} = useTheme()

  return (
    
<label htmlFor={id} className='p-1 rounded-full cursor-pointer' aria-label='switch theme'>
    <input
        id={id} 
        type='checkbox'
        checked={theme === 'dark'}
        onChange={toggleTheme}
        className='hidden'
    />

      {theme === 'dark' ? <Moon size={25} className='text-neutral-300'/> : <Sun size={25} className='text-primary'/>}


</label>
  );
};

export default ThemeSwitch;