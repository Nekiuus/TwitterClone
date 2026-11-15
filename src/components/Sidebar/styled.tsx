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
@media only screen and (max-width: 1280px){
flex: 0 0 80px;
min-width: 80px;
padding-left: 0;
padding-right: 0;
>.twitter-logo{
    width: 60px;
    height: 60px;
    margin: 0 auto;
    padding: 15px;
    box-sizing: border-box;
}
>Button{
    display: none;
}
}
@media only screen and (max-width: 1004px){
width: 80px;
}
@media only screen and (max-width: 500px){
flex: 0 0 68px;
width: 68px;
min-width: 68px;
padding: 0;
}

}


`
export const ProfileBox = styled.div`
    position: relative;
    display: flex;
    margin-top: auto;
    width: 100%;
    min-width: 0;

    @media only screen and (max-width: 1280px) {
        width: 60px;
        margin-left: auto;
        margin-right: auto;
    }

    @media only screen and (max-width: 500px) {
        display: flex;
        width: 56px;
        margin-left: auto;
        margin-right: auto;
    }
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

    @media only screen and (max-width: 1280px) {
        width: 60px;
        height: 60px;
        padding: 5px;
        box-sizing: border-box;
        justify-content: center;

        >div {
            display: none;
        }
    }

    @media only screen and (max-width: 500px) {
        width: 56px;
        height: 56px;
        padding: 6px;
        justify-content: center;
        box-sizing: border-box;

        >div {
            display: none;
        }
    }


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

    @media only screen and (max-width: 1280px) {
        width: 45px;
        height: 45px;
        margin-left: 10px;
        flex-shrink: 0;
    }

    @media only screen and (max-width: 500px) {
        width: 44px;
        height: 44px;
        margin-left: 10px;
        margin-bottom: 20px;
    }
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

@media only screen and (max-width: 1280px){
border-radius: 50%;
width: 60px;
height: 60px;
box-sizing: border-box;
justify-content: center;
padding: 15px;
margin-left: auto;
margin-right: auto;
>h2{
display: none;
}
}
@media only screen and (max-width: 500px){
width: 56px;
height: 56px;
padding: 13px;
}
`