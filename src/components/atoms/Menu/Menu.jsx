import './Menu.css';

export default function Menu({children, Wrapper, className='', hoisted=false, ...props}) {
    if(Wrapper != 'nav' && Wrapper != 'footer') {
        throw Error('Invalid menu type provided.');
    }

    return <Wrapper className={`menu ${className} ${hoisted ? 'hoist' : ''}`} {...props}>
            {children}
    </Wrapper>
}