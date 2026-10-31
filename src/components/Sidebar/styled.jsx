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
    position: relative;
    display: flex;
    margin-top: auto;
    width: 100%;
    min-width: 0;
`
export const ProfileMenuButton = styled.button`
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    min-width: 0;
    padding: 12px 4px;
    border: 0;
    border-radius: 40px;
    color: var(--twitterColor);
    background: transparent;
    text-align: left;
    cursor: pointer;


    &:hover {
        background-color: var(--Hover);
    }

    >div {
        display: flex;
        flex-direction: column;
        text-align: left;
        min-width: 0;
        flex: 1;
    }

    strong{
        font-size: 15px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    span{
        color: var(--text);
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`
export const ProfileAvatar = styled.img`
    width: 48px;
    height: 48px;
    border-radius: 50%;
    object-fit: cover;
`
export const ProfileMenu = styled.div`
    position: absolute;
    bottom: calc(100% + 8px);
    left: 0;
    z-index: 10;
    width: min(240px, calc(100vw - 32px));
    padding: 6px;
    border: 1px solid var(--border);
    border-radius: 12px;
    background: #000;
    box-shadow: 0 4px 18px rgba(0, 0, 0, 0.6);

    button {
        width: 100%;
        padding: 10px 12px;
        border: 0;
        border-radius: 8px;
        color: var(--twitterColor);
        background: transparent;
        text-align: left;
        font: inherit;
        cursor: pointer;
    }

    button:hover {
        background: var(--Hover);
    }
`
export const SidebarIcon = styled.div`
    display: flex;
    width: fit-content;
    align-items: center;
    padding: 14px 10px;
    cursor: pointer;
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