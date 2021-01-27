import styled from 'styled-components';
import React, {useEffect, useState} from 'react';
import 'antd/dist/antd.css';
import {List, Avatar, Button, Modal, Input, Row, Col} from 'antd';
import Collapsible from 'react-collapsible';
import {getJob, getTag, filterTag, adminLogin} from './Api';
import ReactGA from 'react-ga';
import './index.css';
import 'typeface-rubik';
import {Link} from 'react-router-dom';
import {
    MailOutlined,
    KeyOutlined
} from '@ant-design/icons';

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

const head = {
    fontWeight: '600',
    fontSize: '20px',
    color: '#00b7c2'
};

function App() {
    const [jobs, setJobs] = useState([]);
    const [tags, setTags] = useState([]);
    const [activeIndex, setActiveIndex] = useState(null);
    const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState(null);

    useEffect(() => {
        const fetchJobs = async () => {
            const jobsData = await getJob();
            const tagsData = await getTag();
            setTags(tagsData.tags);
            setJobs(jobsData.jobs);
            setToken(localStorage.getItem('token'));
        };
        fetchJobs();
    }, []);

    const filterTagAction = async (item) => {
        const filterJobs = await filterTag(item);
        setJobs(filterJobs.jobs);
    };

    const AllTagAction = async () => {
        const jobsData = await getJob();
        setJobs(jobsData.jobs);
    };

    const toggleClass = (index) => {
        if (activeIndex === index) {
            setActiveIndex(null);
        } else {
            setActiveIndex(index);
        }
    };

    const setIsModalVisible = () => {
        setIsLoginModalVisible(true);
    };

    const handleLogin = async () => {
        const login = await adminLogin({email, password});
        setToken(login.token);
        localStorage.setItem('token', login.token);
        setIsLoginModalVisible(false);
    };

    const handleCancel = () => {
        setIsLoginModalVisible(false);
    };

    return (
        <Container>
            <Modal
                title='Login'
                visible={isLoginModalVisible}
                onOk={handleCancel}
                onCancel={handleCancel}
                footer={null}
            >

                <Row>
                    <Col span={9}>
                        <Container style={{marginLeft: '30%'}}>
                            <div
                                className='App-admin'
                                style={{borderRadius: 0}}
                            >
                                <div style={{width: '90%', marginLeft: '16px'}}>
                                    <h4 style={head}>Admin</h4>
                                    <div style={{paddingTop: '4%'}}>
                                        <Input
                                            addonBefore={<MailOutlined/>}
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder='Email'
                                        />
                                    </div>
                                    <div style={{paddingTop: '4%'}}>
                                        <Input
                                            addonBefore={<KeyOutlined/>}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder='Password'
                                            type={'password'}
                                        />
                                    </div>
                                    <div style={{paddingTop: '15%', paddingBottom: '5%'}}>
                                        <Button
                                            style={{
                                                borderWidth: 4,
                                                borderColor: '#00b7c2',
                                                width: '100%'
                                            }}
                                            size='large'
                                            onClick={() => handleLogin()}
                                        >
                                            <div style={head}>Login</div>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Container>
                    </Col>
                </Row>

            </Modal>
            <div style={{height: 10, background: '#00b7c2'}}/>
            <div>
                <Container style={{background: '#ffffff'}}>
                    <LogoBody/>
                </Container>

                <PostJob token={token}/>
                <div
                    style={{
                        paddingBottom: '3%',
                        marginLeft: '10%',
                        marginRight: '10%',
                        width: '80%',
                        display: 'flex',
                        overflowX: 'scroll',
                        overflowY: 'hidden',
                        whiteSpace: 'no-wrap'
                    }}
                >
                    <Button
                        onClick={() => AllTagAction()}
                        style={{marginLeft: 4, marginTop: 4, borderWidth: 2, borderColor: '#4a47a3'}}
                        size='small'
                        ghost={true}
                    >
                        <font color='#4a47a3'> <strong>{'All'}</strong></font>
                    </Button>
                    {tags.map((item, i) => {
                        return (
                            <Button
                                key={i}
                                onClick={() => filterTagAction(item.tag)}
                                style={{marginLeft: 4, marginTop: 4, borderWidth: 2, borderColor: '#4a47a3'}}
                                size='small'
                                ghost={true}
                            >
                                <font color='#4a47a3'> <strong>{item.tag}{' x '}{item.count}</strong></font>
                            </Button>
                        );
                    })}
                </div>
                <TableContainer style={{paddingTop: '2%', paddingLeft: '10%', width: '90%'}}>
                    {jobs.map((item, i) => {
                        return (
                            <div key={i}>
                                <ListItem
                                    item={item}
                                    index={i}
                                    activeIndex={activeIndex}
                                    toggleClass={toggleClass}
                                    token={token}
                                />
                            </div>
                        );
                    })}
                </TableContainer>
            </div>
            <Container style={{height: 30}}>
                <Button
                    style={{
                        borderWidth: 2,
                        borderColor: '#4a47a3',
                        width: 70,
                        marginLeft: 10
                    }}
                    size='small'
                    onClick={() => setIsModalVisible()}
                >
                    <font color='#4a47a3'> <strong>{'Admin'}</strong></font>
                </Button>
            </Container>
        </Container>
    );
}

const ListItem = ({item, index, activeIndex, toggleClass, token}) => {
    return (
        <div>
            <List.Item
                onClick={() => toggleClass(index)}
                style={{
                    backgroundColor: '#f4f9f4',
                    cursor: 'pointer'
                }}
            >
                <List.Item.Meta
                    avatar={
                        <Avatar
                            style={{marginLeft: 7}}
                            shape='square'
                            size='large'
                            src={item.companyImage}
                        />}
                    title={
                        <TagContainer>
                            <div style={{color: '#000000', fontSize: 20, fontWeight: '400'}}>
                                {item.companyName}
                            </div>
                        </TagContainer>
                    }
                    description={
                        <div style={{paddingTop: 2}}>
                            <div style={{color: '#000000', fontSize: 22, fontWeight: '500'}}>
                                {item.jobTitle}
                            </div>
                            <div style={{paddingTop: 5}}>
                                <div
                                    style={{
                                        border: 'solid',
                                        borderRadius: 5,
                                        borderWidth: 2,
                                        borderColor: '#f05454',
                                        textAlign: 'center',
                                        wordWrap: 'break-word',
                                        display: 'inline-block'
                                    }}
                                >
                                    <font color='#f05454'>
                                        <strong>&nbsp;&nbsp;{item.jobLocation}&nbsp;&nbsp;</strong>
                                    </font>
                                </div>
                            </div>
                        </div>
                    }
                />
                <Tags
                    item={item}
                    token={token}
                />
            </List.Item>
            <Collapsible open={activeIndex === index}>
                <br/>
                <Content item={item}/>
            </Collapsible>
            <br/>
        </div>
    );
};

const Content = ({item}) => {
    if (window.innerWidth > 415) {
        return (
            <Container style={{width: '70%', marginLeft: '15%', padding: '2%'}}>
                <div dangerouslySetInnerHTML={{__html: item.jobContent}}/>
            </Container>
        );
    } else {
        return (
            <Container style={{width: '90%'}}>
                <div dangerouslySetInnerHTML={{__html: item.jobContent}}/>
            </Container>
        );
    }
};

const Tags = ({item, token}) => {
    if (window.innerWidth > 415) {
        return (
            <>
                <TagContainer style={{paddingRight: '20%'}}>
                    {item.tags.map((subItem, i) =>
                        (
                            <Button
                                key={i}
                                style={{
                                    marginLeft: 4,
                                    marginTop: 4,
                                    borderWidth: 2,
                                    borderColor: '#4a47a3'
                                }}
                                size='small'
                                ghost={true}
                            >
                                <font color='#4a47a3'> <strong>{subItem}</strong></font>
                            </Button>
                        )
                    )}
                </TagContainer>
                <div style={{paddingRight: '2%'}}>
                    <ApplyEditButton
                        token={token}
                        item={item}
                    />
                </div>
            </>
        );
    } else {
        return (
            <>
                <TagContainer style={{paddingTop: '2%'}}>
                    {item.tags.map((subItem, i) =>
                        (
                            <Button
                                key={i}
                                style={{
                                    marginTop: 4,
                                    marginLeft: 4,
                                    borderWidth: 2,
                                    borderColor: '#4a47a3'
                                }}
                                size='small'
                                ghost={true}
                            >
                                <font color='#4a47a3'><strong>{subItem}</strong></font>
                            </Button>
                        )
                    )}
                    <div style={{paddingRight: '2%'}}>
                        <Button
                            size='small'
                            type='primary'
                            href={item.jobLink}
                            style={{
                                marginTop: 4,
                                marginLeft: 4,
                                borderWidth: 2,
                                borderColor: '#00b7c2'
                            }}
                            ghost={true}
                        >
                            <font color='#00b7c2'> <strong>{'Apply'}</strong></font>
                        </Button>
                    </div>
                </TagContainer>
            </>
        );
    }
};

const PostJob = ({token}) => {
    if (token === null) {
        return <div/>;
    } else {
        return (
            <Link to={'/addjob'}>
                <HeaderContainer>
                    <Button
                        style={{
                            marginTop: 4,
                            marginBottom: 10,
                            borderWidth: 2,
                            borderColor: '#f05454'
                        }}
                        size='small'
                        ghost={true}
                    >
                        <font color='#f05454'> <strong>{'Post Job'}</strong></font>
                    </Button>
                </HeaderContainer>
            </Link>
        );
    }
};

const ApplyEditButton = ({token, item}) => {
    if (token === null) {
        return (
            <Button
                size='small'
                type='primary'
                onClick={() => window.open(item.jobLink)}
                style={{borderWidth: 2, borderColor: '#00b7c2'}}
                ghost={true}
            >
                <font color='#00b7c2'> <strong>{'Apply'}</strong></font>
            </Button>
        );
    } else {
        return (
            <Link
                to={{
                    pathname: '/editjob',
                    state: {
                        job: item
                    }
                }}
            >
                <Button
                    size='small'
                    type='primary'
                    style={{borderWidth: 2, borderColor: '#00b7c2'}}
                    ghost={true}
                >
                    <font color='#00b7c2'> <strong>{'Edit'}</strong></font>
                </Button>
            </Link>
        );
    }
};

const LogoBody = () => {
    return (
        <HeaderContainer>
            <Logo/>
        </HeaderContainer>
    );
};

const Logo = () => {
    if (window.innerWidth > 415) {
        return (
            <HeaderContainer style={{marginTop: '2%'}}>
                <img
                    alt='full-stack-developer-jobs'
                    style={{height: '95px', width: '95px'}}
                    src={require('./robot.jpg')}
                />
                <h2
                    style={{
                        color: '#00b7c2',
                        fontSize: 55,
                        fontWeight: '700',
                        marginTop: '2%'
                    }}
                >
                    Full Stack Bot
                </h2>
            </HeaderContainer>
        );
    } else {
        return (
            <HeaderContainer style={{marginTop: '2%'}}>
                <img
                    alt='full-stack-developer-jobs'
                    style={{height: '55px', width: '55px'}}
                    src={require('./robot.jpg')}
                />
                <h3
                    style={{
                        color: '#00b7c2',
                        fontSize: 25,
                        fontWeight: '700',
                        marginTop: '2%'
                    }}
                >
                    Full Stack Bot
                </h3>
            </HeaderContainer>
        );
    }
};

export default App;