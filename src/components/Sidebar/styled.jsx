import styled from 'styled-components'


export const Container = styled.div`
padding: 12px 16px;
border-right: 1px solid var(--border);
flex: 0 0 23%;
min-width: 0;
height: 100vh;
box-sizing: border-box;
display: flex;
flex-direction: column;
>.twitter-logo{
    display: block;
    margin: 8px 4px;
    width: 46px;
    height: 30px;
    fill: var(--twitterColor) !important;
}
>Button{
    background-color: var(--twitterColor);
    color: black;
    font-weight: 500;
    border: none;
    border-radius: 40px;
    text-transform: inherit;
    height: 50px;
    padding: 0 20px;
    max-width: 230px;
    font-size: 18px;
    margin-top: 20px;
    font-family: var(--heading);
}
`
export const ProfileBox = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: auto;
    padding: 12px 4px;
    color: var(--twitterColor);

    >div{
        display: flex;
        flex-direction: column;
        text-align: left;
    }

    strong{
        font-size: 15px;
    }

    span{
        color: var(--text);
        font-size: 14px;
    }
`
export const ProfileAvatar = styled.img`
    width: 48px;
    height: 48px;
    border-radius: 50%;
    object-fit: cover;
`
export const SidebarIcon = styled.div`
    display: flex;
    width: fit-content;
    align-items: center;
    padding: 14px 10px;
>h2{
    font-size: 20px;
    margin: 0 15px 0 20px;
    font-weight: 700;
}
>.MuiSvgIcon-root{
    width: 30px;
    height: 30px;
    fill: var(--twitterColor);
}
&:hover{
    background-color: var(--Hover);
    color: var(--twitterColor);
    transform: color 100ms ease-in-out;
    border-radius: 40px;
    
}
`