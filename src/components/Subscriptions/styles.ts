import styled from "styled-components";

export const Container = styled.div`
   
    display: flex;
    align-items: center;
    justify-content: center;
	height: calc(100vh - 108px);

.plans {
    display: flex;
    flex-direction: column;
    gap: 24px;
	list-style: none;
	margin: 0;

	& button:disabled{
		cursor: not-allowed;
	}
	
	.plan {
		background: white;
		border-radius: 6px;
		height: 60px;
		opacity: 0.8;
		padding: 4px 25px;
		width: 450px;
        display: flex;
    align-items: center;
    justify-content: space-between;
    transition: all .5s ease-in-out;
	
		.price {
			border-radius: 100%;
			cursor: default;
			display: block;
			float: left;
			height: 46px;
			line-height: 46px;
			margin: 8px 10px 0 0;
			text-align: center;
			width: 46px;
					
			&.price-green {
				background-color: #e1f1d1;
				color: #52b327;
			}
					
			&.price-red {
				background-color: #f1e1d1;
				color: #b35227;
			}
		}
		
		.details {
			color: #222;
			display: flex;
            flex-direction: column;
			height: 46px;
			margin: 8px 0;
			padding: 0px 10px;
			
			.plan-title {
				font-size: 17px;
				font-weight: normal;
				margin: 2px 0 0;
				padding: 0;
				text-transform: uppercase;
			}
			
			.plan-description {
				color: #666;
				font-size: 14px;
				margin: 0;
				padding: 0;
			}
		}
		
		.select {
			background: #060B28;
			border: none;
			border-radius: 4px;
			color: white;
			display: inline-block;
			font-size: 14px;
			margin: 15px 0;
			padding: 7px 16px;
			
			&:hover {
				background-color: #459cde;
			}
		}
        &:hover {
          transform: scale(1.2);
        }
	}

    
}
`