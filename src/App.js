import styled from 'styled-components';
import React from 'react';
import 'antd/dist/antd.css';
import {List, Avatar, Button} from 'antd';
import {jobData} from './jobs'
import ReactGA from 'react-ga';
import './index.css';
import 'typeface-rubik';

ReactGA.initialize('UA-31455093-8');
ReactGA.pageview(window.location.pathname + window.location.search);

const Container = styled.section`
  display: flex;
  margin: 0;
  flex-direction: column;
  word-wrap: break-word;
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
    <Container>
      <div style={{height: 10,background: '#00b7c2'}}/>
      <div>
          <Container style={{background: '#ffffff'}}>
            <LogoBody/>
          </Container>
          <TableContainer style={{paddingTop: '1%', paddingLeft:"10%", width: '90%'}}>
              {jobData.map((item, i) => {
                  return (
                    <div key={i}>
                      <ListItem item={item}/>
                    </div>
                  )
              })}
          </TableContainer>
      </div>
    </Container>
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
                <div style={{color: "#000000",fontSize: 22, fontWeight: "500"}}>
                    {item.jobTitle}
                </div>
                <div  style={{paddingTop: 5}}>
                  <div style={{border: 'solid',borderRadius: 5, borderWidth: 2, borderColor: "#f05454", textAlign: 'center', wordWrap: 'break-word',display:'inline-block'}}>
                    <font color="#f05454"><strong>&nbsp;&nbsp;{item.jobLocation}&nbsp;&nbsp;</strong></font>
                  </div>
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
                <font color="#4a47a3"><strong>{subItem}</strong></font>
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
    return (
        <HeaderContainer>
          <Logo/>
        </HeaderContainer>
    )
}


const Logo = (props) => {
  if (window.innerWidth > 415) {
    return (
      <HeaderContainer style={{marginTop: '2%'}}>
          <img alt="full-stack-developer-jobs" style={{height: '75px', width: '75px'}} src={require('./robot.jpg')} />
          <h2 style={{color: '#00b7c2', fontWeight: '700', marginTop: '2%'}}>Full Stack Bot</h2>
      </HeaderContainer>
    )
  } else {
    return (
      <HeaderContainer style={{marginTop: '2%'}}>
          <img alt="full-stack-developer-jobs" style={{height: '35px', width: '35px'}} src={require('./robot.jpg')} />
          <h3 style={{color: '#00b7c2', fontWeight: '700', marginTop: '2%'}}>Full Stack Bot</h3>
      </HeaderContainer>
    )
  }
}

export default App;