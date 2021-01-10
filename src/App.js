import styled from 'styled-components';
import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Layout, List, Avatar, Button, Typography} from 'antd';
import {jobData} from './jobs'
import ReactGA from 'react-ga';

ReactGA.initialize('UA-31455093-8');
ReactGA.pageview(window.location.pathname + window.location.search);


const {Header} = Layout;
const { Title } = Typography;

const Container = styled.section`
  display: flex;
  margin: 0;
  flex-direction: column;
  word-break: break-all;
`;

const HeaderContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-text: center;
`;

const TableContainer = styled.section`
  display: flex;
  margin: 0;
  flex-direction: column;
  text-align: left;
`;

const TagContainer = styled.section`
  flex-direction: row;
  align-items: center;
`;

function App() {

  return (
    <div className="App">
      <Container>
        <Header style={{height: 10,background: '#00b7c2'}}/>
        <Header style={{background: '#ffffff'}}>
          <LogoBody/>
        </Header>
        <TableContainer style={{paddingTop:"8%", paddingLeft:"10%", width: '90%'}}>
            {jobData.map((item, i) => {
                return (
                  <div key={i}>
                    <ListItem item={item}/>
                  </div>
                )
            })}
        </TableContainer>
      </Container>
    </div>
  );
}


const ListItem = ({item, i}) => {
    return (
      <div>
        <List.Item style={{backgroundColor:"#f4f9f4"}}>
          <List.Item.Meta
            avatar={
                <Avatar style={{marginLeft: 7}} shape="square" size="large" src={item.companyImage}/>}
            title={
                <TagContainer>
                  <div style={{color: "#000000",fontSize: 20, fontWeight: "400"}}>
                    {item.companyName}
                  </div>
                </TagContainer>
            }
            description={ 
              <div style={{paddingTop: 2}}>
                <div style={{color: "#000000",fontSize: 22, fontWeight: "600"}}>
                    {item.jobTitle}
                </div>
                <div  style={{paddingTop: 5}}>
                  <Button style={{borderWidth: 2, borderColor: "#ff5151", }} size="small" ghost>
                    <font color="#ff5151"><strong>{item.jobLocation}</strong></font>
                  </Button>
                </div>         
              </div>
            }
          />
            <Tags item={item}/>
        </List.Item>
        <br/>
      </div>
    )
}

const Tags = ({item}) => {
  if (window.innerWidth > 415) {
    return ( 
        <>
          <TagContainer style={{paddingRight: "20%"}}>
            {item.tags.map((subItem, i) =>
              <Button key={i} style={{marginLeft: 4, marginTop: 4,borderWidth: 2, borderColor: "#4a47a3", }} size="small" ghost>
                  <font color="#4a47a3"> <strong>{subItem}</strong></font>
              </Button>
            )}
          </TagContainer>
          <div style={{paddingRight: "2%"}}>
            <Button size="small" type="primary" onClick={ () => window.open(item.jobLink)} style={{borderWidth: 2, borderColor: "#00b7c2"}} ghost>
              <font color="#00b7c2"> <strong>{'Apply'}</strong></font>
            </Button>
          </div>
        </>
    )
  } else {
    return (
      <>
          <TagContainer style={{paddingTop: "2%"}}>
            {item.tags.map((subItem, i) =>
              <Button key={i} style={{marginTop: 4,marginLeft: 4,borderWidth: 2, borderColor: "#4a47a3", }} size="small" ghost>
                <font color="#4a47a3">{subItem}</font>
              </Button>
            )}
            <div style={{paddingRight: "2%"}}>
              <Button size="small" type="primary" href={item.jobLink} style={{marginTop: 4,marginLeft: 4,borderWidth: 2, borderColor: "#00b7c2"}} ghost>
                <font color="#00b7c2"> <strong>{'Apply'}</strong></font>
              </Button>
            </div>
          </TagContainer>
      </>
    )
  }
}

const LogoBody = () => {
  if (window.innerWidth > 415) {
    return (
      <Title style={{paddingTop: '0%'}}>
        <HeaderContainer>
          <Logo/>
        </HeaderContainer>
      </Title>
    ) 
  }
  else {
    return (
      <Title style={{paddingTop: '3%'}}>
        <HeaderContainer>
          <Logo/>
        </HeaderContainer>
      </Title>
    ) 
  }
}


const Logo = (props) => {
  if (window.innerWidth > 415) {
    return (
      <div style={{height: '20%', width: '25%'}}>
        <LogoSvg/>
      </div>
    )
  } else {
    return (
      <div style={{height: '30%', width: '55%'}}>
        <LogoSvg/>
      </div>
    )
  }
}

function LogoSvg(props) {
  return (
    <svg
      viewBox="0 0 1024 600"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={2}
      {...props}
    >
      <text
        x={115.967}
        y={253.423}
        fontFamily="'Rubik-Bold','Rubik'"
        fontWeight={700}
        fontSize={78.699}
        fill="#00b7c2"
        transform="translate(-137.354 68.652) scale(1.67579)"
      >
        {"Full Stack  Bot"}
        <tspan x={503.954} y={253.423} />
      </text>
      <path
        d="M499.428 57.18c-.078 0-.147-.021-.225-.021-30.745.129-53.048 25.164-52.958 53.758.037 10.776 3.204 21.035 9.166 29.656 5.125 7.456 21.234 20.529 21.234 44.388h45.566c0-23.664 16.137-37.048 21.233-44.38 5.985-8.666 9.16-18.975 9.166-29.826.015-28.56-22.402-53.58-53.182-53.575z"
        fill="#fed843"
        fillRule="nonzero"
      />
      <path
        d="M543.444 140.58c5.985-8.665 9.16-18.975 9.166-29.826.015-28.558-22.402-53.579-53.182-53.574v127.78h22.783c0-23.663 16.137-37.047 21.233-44.38z"
        fill="#fabe2c"
        fillRule="nonzero"
      />
      <path
        d="M392.6 239.687a7.585 7.585 0 01-7.594-7.584c0-20.909 17.035-37.921 37.972-37.921h19.759a7.585 7.585 0 110 15.168h-19.76c-12.562 0-22.782 10.207-22.782 22.753a7.585 7.585 0 01-7.595 7.584z"
        fill="#47568c"
        fillRule="nonzero"
      />
      <path
        d="M606.255 239.687a7.585 7.585 0 01-7.594-7.584c0-12.546-10.726-22.753-23.29-22.753H556.12a7.585 7.585 0 110-15.168h19.253c20.936 0 38.478 17.012 38.478 37.921a7.585 7.585 0 01-7.595 7.584z"
        fill="#29376d"
        fillRule="nonzero"
      />
      <path
        d="M529.805 179.013H469.05c-20.936 0-37.972 17.013-37.972 37.921v61.18a7.585 7.585 0 007.595 7.585h121.51a7.585 7.585 0 007.594-7.585v-61.18c0-20.908-17.035-37.921-37.972-37.921z"
        fill="#fabe2c"
        fillRule="nonzero"
      />
      <path
        d="M567.777 278.114v-61.18c0-20.908-17.035-37.921-37.972-37.921h-30.377v106.686h60.755a7.585 7.585 0 007.594-7.585z"
        fill="#ff9100"
        fillRule="nonzero"
      />
      <path
        d="M423.484 118.339h-15.189a7.585 7.585 0 110-15.169h15.189a7.585 7.585 0 110 15.169zM413.924 160.052a7.577 7.577 0 012.781-10.361l13.157-7.585c3.612-2.088 8.261-.844 10.375 2.778a7.577 7.577 0 01-2.78 10.361L424.3 162.83c-3.594 2.073-8.253.881-10.376-2.778zM429.862 78.897l-13.156-7.584a7.577 7.577 0 01-2.781-10.362c2.099-3.622 6.749-4.866 10.375-2.777l13.157 7.584a7.577 7.577 0 012.78 10.362c-2.119 3.653-6.776 4.853-10.375 2.777z"
        fill="#fed843"
        fillRule="nonzero"
      />
      <path
        d="M590.56 118.339h-15.188a7.585 7.585 0 110-15.169h15.188a7.585 7.585 0 110 15.169zM558.618 76.12a7.577 7.577 0 012.78-10.362l13.157-7.584c3.605-2.09 8.27-.845 10.376 2.777a7.577 7.577 0 01-2.781 10.362l-13.157 7.584c-3.593 2.073-8.253.882-10.375-2.777zM574.556 162.83l-13.157-7.585a7.577 7.577 0 01-2.78-10.361c2.09-3.622 6.734-4.866 10.375-2.778l13.156 7.585a7.577 7.577 0 012.781 10.361c-2.119 3.654-6.776 4.854-10.375 2.778z"
        fill="#fabe2c"
        fillRule="nonzero"
      />
      <path
        d="M529.805 239.687a7.585 7.585 0 01-7.594-7.584v-15.169a7.585 7.585 0 017.594-7.584 7.585 7.585 0 017.595 7.584v15.169a7.585 7.585 0 01-7.595 7.584z"
        fill="#29376d"
        fillRule="nonzero"
      />
      <path
        d="M469.05 239.687a7.585 7.585 0 01-7.594-7.584v-15.169a7.585 7.585 0 017.594-7.584 7.585 7.585 0 017.595 7.584v15.169a7.585 7.585 0 01-7.595 7.584z"
        fill="#47568c"
        fillRule="nonzero"
      />
      <path
        d="M606.255 270.024a7.585 7.585 0 110-15.168c4.19 0 7.595-3.4 7.595-7.584 0-4.185-3.405-7.585-7.595-7.585-4.19 0-7.594 3.4-7.594 7.585a7.585 7.585 0 01-7.594 7.584 7.585 7.585 0 01-7.595-7.584c0-12.547 10.22-22.753 22.783-22.753s22.784 10.206 22.784 22.753c0 12.546-10.22 22.752-22.784 22.752z"
        fill="#ff9100"
        fillRule="nonzero"
      />
      <path
        d="M392.6 270.024c-12.563 0-22.783-10.206-22.783-22.752 0-12.547 10.22-22.753 22.783-22.753s22.783 10.206 22.783 22.753a7.585 7.585 0 01-7.594 7.584 7.585 7.585 0 01-7.594-7.584c0-4.185-3.405-7.585-7.595-7.585-4.19 0-7.594 3.4-7.594 7.585 0 4.184 3.404 7.584 7.594 7.584a7.585 7.585 0 110 15.168z"
        fill="#fabe2c"
        fillRule="nonzero"
      />
      <path
        d="M499.428 209.35a7.585 7.585 0 00-7.595 7.584v15.169a7.585 7.585 0 007.595 7.584 7.585 7.585 0 007.594-7.584v-15.169a7.585 7.585 0 00-7.594-7.584z"
        fill="#47568c"
        fillRule="nonzero"
      />
      <path
        d="M507.022 232.103v-15.169a7.585 7.585 0 00-7.594-7.584v30.337a7.585 7.585 0 007.594-7.584z"
        fill="#29376d"
        fillRule="nonzero"
      />
      <path
        d="M514.617 103.17a7.585 7.585 0 00-7.595 7.584c0 4.185-3.404 7.585-7.594 7.585s-7.595-3.4-7.595-7.585a7.585 7.585 0 00-7.594-7.584 7.585 7.585 0 00-7.594 7.584c0 12.547 10.22 22.753 22.783 22.753s22.783-10.206 22.783-22.753a7.585 7.585 0 00-7.594-7.584z"
        fill="#47568c"
        fillRule="nonzero"
      />
      <path
        d="M522.21 110.754a7.585 7.585 0 00-7.593-7.584 7.585 7.585 0 00-7.595 7.584c0 4.185-3.404 7.585-7.594 7.585v15.168c12.563 0 22.783-10.206 22.783-22.753z"
        fill="#29376d"
        fillRule="nonzero"
      />
      <path
        d="M560.183 270.53h-121.51v45.506h121.51V270.53z"
        fill="#47568c"
        fillRule="nonzero"
      />
      <path
        fill="#29376d"
        fillRule="nonzero"
        d="M499.428 270.53h60.755v45.506h-60.755z"
      />
      <path
        d="M560.183 285.699h-121.51v15.168h121.51V285.7z"
        fill="#d5e8fe"
        fillRule="nonzero"
      />
      <path
        fill="#b5dbff"
        fillRule="nonzero"
        d="M499.428 285.699h60.755v15.168h-60.755z"
      />
      <circle
        cx={256}
        cy={467}
        r={45}
        fill="#47568c"
        transform="matrix(.5063 0 0 .50562 369.817 57.159)"
      />
      <path
        d="M522.21 293.283c0-12.547-10.22-22.753-22.782-22.753v45.506c12.563 0 22.783-10.207 22.783-22.753zM560.183 316.036c-12.563 0-22.783-10.207-22.783-22.753 0-12.547 10.22-22.753 22.783-22.753s22.783 10.206 22.783 22.753c0 12.546-10.22 22.753-22.783 22.753z"
        fill="#29376d"
        fillRule="nonzero"
      />
      <path
        d="M438.673 316.036c-12.563 0-22.783-10.207-22.783-22.753 0-12.547 10.22-22.753 22.783-22.753s22.783 10.206 22.783 22.753c0 12.546-10.22 22.753-22.783 22.753z"
        fill="#47568c"
        fillRule="nonzero"
      />
      <circle
        cx={376}
        cy={467}
        r={15}
        fill="#d5e8fe"
        transform="matrix(.5063 0 0 .50562 369.817 57.159)"
      />
      <circle
        cx={136}
        cy={467}
        r={15}
        fill="#edf5ff"
        transform="matrix(.5063 0 0 .50562 369.817 57.159)"
      />
      <circle
        cx={256}
        cy={467}
        r={15}
        fill="#edf5ff"
        transform="matrix(.5063 0 0 .50562 369.817 57.159)"
      />
      <path
        d="M507.022 293.283c0-4.185-3.404-7.584-7.594-7.584v15.168c4.19 0 7.594-3.4 7.594-7.584z"
        fill="#d5e8fe"
        fillRule="nonzero"
      />
    </svg>
  )
}

export default App;