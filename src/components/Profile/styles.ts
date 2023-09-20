import styled from "styled-components";

export const Container = styled.div`
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active  {
  -webkit-box-shadow: 0 0 0 30px white inset !important;
}

input[type="date"]::-webkit-calendar-picker-indicator {
    filter: invert(1);
    margin: 0px;
    margin-right: 20px !important;
 
}


& button:disabled{
    color: #1976d2;
    cursor: not-allowed;
}

    .avatar-upload {
    position: relative;

    & img{
            position: absolute;
    top: 0;
    width: 192px;
    height: 192px;
    border-radius: 50%;
    object-fit: cover;
        }
    .avatar-edit {
        position: absolute;
        right: 12px;
        z-index: 1;
        top: 10px;

        input {
            display: none;
            + label {
                display: inline-block;
                width: 34px;
                height: 34px;
                margin-bottom: 0;
                border-radius: 100%;
                background: #FFFFFF;
                border: 1px solid transparent;
                box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12);
                cursor: pointer;
                font-weight: normal;
                transition: all .2s ease-in-out;
                &:hover {
                    background: #f1f1f1;
                    border-color: #d6d6d6;
                }
                &:after {
                    content: '';
                    background-image: url('/icon-pen.png') ;
                    background-size: cover;
                    font-family: 'FontAwesome';
                    color: #757575;
                    position: absolute;
                    top: 4px;
                    left: 0;
                    right: 0;
                    text-align: center;
                    margin: auto;
                    height: 26px;
                    width: 26px;
                }
            }
        }
    }
    .avatar-preview {
        width: 192px;
        height: 192px;
        position: relative;
        border-radius: 100%;
        border: 6px solid #F8F8F8;
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
        > div {
            width: 100%;
            height: 100%;
            border-radius: 100%;
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
        }
    }
}

.circle{
    height: 150px;
    width: 150px;
    border-radius: 50%;
    border: 2px dotted white;
    display: flex;
    align-items: center;
    justify-content: center;

    & img{
        height: 150px;
    width: 150px;
    border-radius: 50%;
    object-fit: cover;
    }
}

.d-inline{
    display: flex;
    flex-direction: column;
    align-items: center;
}

.container-fluid{
    display: flex;
    justify-content: center;
}

.content{
    margin-top: 48px;
}

.mt-5{
    margin-bottom:  20px;
}

.row{
    display: flex;
    height: 100%;
    gap: 48px;

    .col-md-3{
        width: 300px;
    }
}

.col-md-9{
    min-width: 300px;
    width: 100%;
}

.container{
    display: flex;
    flex-direction: column;
    gap: 12px;
    //max-width: 500px;
}

.form-group{
    display: flex;
    flex-direction: column;
}

.form-control{
    background: transparent;
    border: none;
    border-bottom: 2px solid white;
    padding: 15px 0 6px 0;
    outline: none;
    color: white;
    background-color: transparent !important;
}

.save{
    margin-top: 32px;
}

`