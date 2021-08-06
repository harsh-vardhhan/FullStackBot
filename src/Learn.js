import styled from 'styled-components';
import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import {useHistory} from 'react-router-dom';
import {Typography, Row, Avatar, PageHeader, Col} from 'antd';

const {Title} = Typography;

const Container = styled.section`
  display: flex;
  margin: 0;
  flex-direction: column;
  word-wrap: break-word;
`;

const TableContainer = styled.section`
  display: flex;
  margin: 0;
  flex-direction: column;
  text-align: left;
`;

const highlight = {
    background: '#b4f2e1',
    color: '#000000'
};

const heading = {
    fontSize: '20px',
    color: '#525f7f'
};

const price = {
    fontSize: '11vh',
    color: '#525f7f'
};

function Learn() {
    const history = useHistory();
    return (
        <div className='App'>
            <div style={{height: 10, background: '#00b7c2'}}/>
            <PageHeader
                className='site-page-header'
                onBack={() => history.push('/')}
                title='Job Board'
                subTitle='Learn To Build'
            />
            <Container>
                <TableContainer style={{paddingTop: '2%', paddingLeft: '10%', width: '90%', textAlign: 'center'}}>
                    <Row>
                        <Avatar
                            size={124}
                            src={'https://firebasestorage.googleapis.com/v0/b/squarespace-chat.appspot.com/o/images%2F508d?alt=media&token=70114f08-6dcc-4343-8e37-ff1fafec9338'}
                        />
                    </Row>
                    <Title>Hey 👋,
                        <a
                            target='_blank'
                            href={'https://github.com/TrakBit'}
                        >
                            Harsh Vardhan
                        </a> here. I am 7 years experienced developer</Title>
                    <Title>
                        I give a 1-1 direct training class to
                        <a style={highlight}> prepare you for landing a well paid job. 💰</a>
                    </Title>

                    <Row>
                        <img
                            style={{width: '60%'}}
                            src={'https://firebasestorage.googleapis.com/v0/b/squarespace-chat.appspot.com/o/images%2Flanguages.png?alt=media&token=53249c5c-20dc-466d-875e-3cf85b043c6a'}
                        />
                    </Row>

                    <Row style={{paddingTop: '2%'}}>
                        <Title>Learn technologies built on two most popular programming languages. Source: Github</Title>
                    </Row>

                    <Row style={{paddingTop: '2%'}}>
                        <Col
                            sm={24}
                            md={12}
                        >
                            <div style={{textAlign: 'center', backgroundColor: '#f4f9f4', borderRadius: '30px', width: '90%', marginLeft: '5%'}}>
                                <br/>
                                <h1 style={heading}>{'Django Rest Framework'}</h1>
                                <h2 style={heading}>{'Backend'}</h2>
                                <h2 style={heading}>{'Hourly rate of a Django freelancer'}</h2>
                                <div style={{marginTop: '1%', marginBottom: '5%'}}>
                                    <h1 style={price}>
                                        $50.78
                                    </h1>
                                </div>
                            </div>
                        </Col>

                        <Col
                            sm={24}
                            md={12}
                        >
                            <div style={{textAlign: 'center', backgroundColor: '#f4f9f4', borderRadius: '30px', width: '90%', marginLeft: '5%'}}>
                                <br/>
                                <h1 style={heading}>{'ReactJs'}</h1>
                                <h2 style={heading}>{'Frontend (Web)'}</h2>
                                <h2 style={heading}>{'Hourly rate of a ReactJs freelancer'}</h2>
                                <div style={{marginTop: '1%', marginBottom: '5%'}}>
                                    <h1 style={price}>
                                        $40.14
                                    </h1>
                                </div>
                            </div>
                        </Col>
                    </Row>

                    <Title>
                        Wil also be provided with free guidance on how to
                        <a style={highlight}> sell yourself as a developer </a>
                    </Title>

                    <Row>
                        <iframe
                            class="airtable-embed" 
                            src="https://airtable.com/embed/shrmDmQNq3WCjPOG2?backgroundColor=orange" frameborder="0" 
                            onmousewheel="" 
                            width="100%" 
                            height="533" 
                            style={{background: 'transparent', border: '1px solid #ccc'}}
                        />
                    </Row>

                </TableContainer>
            </Container>
        </div>
    );
}

export default Learn;