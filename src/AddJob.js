import styled from 'styled-components';
import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import {Button, Input, Row, Col, Avatar, PageHeader, Alert} from 'antd';
import firebase from 'firebase/app';
import 'firebase/storage';
import {addJob} from './Api';
import config from './Config';

const {TextArea} = Input;

const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
`;
const Container = styled(FlexCol)`
  padding: 4rem;
  align-items: center;
  justify-content: space-between;
`;

const head = {
    fontWeight: '500',
    fontSize: '20px',
    color: '#00b7c2'
};

const post = {
    fontWeight: '500',
    fontSize: '20px',
    color: '#FFFFFF'
};

firebase.initializeApp(config);
const storage = firebase.storage();

class AddJob extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fileName: false,
            file: null,
            companyName: '',
            jobTitle: '',
            jobLink: '',
            jobContent: '',
            saved: 0,
            tags: ''
        };
        //this.onChange = this.onChange.bind(this);
        //this.resetFile = this.resetFile.bind(this);
    }
    onChange = (event) => {
        this.setState({
            file: URL.createObjectURL(event.target.files[0]),
            fileName: event.target.files[0]
        });
    }

    resetFile = (event) => {
        event.preventDefault();
        this.setState({file: null});
    }

    postJob = async () => {
        if (this.state.fileName) {
            const fileType = this.state.fileName.type;
            const fileSize = (parseInt(this.state.fileName.size, 10) / 1024) / 1024;
            const fileName = Math.random().toString(36).substring(7);

            if (fileSize < 1) {
                const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
                if (validImageTypes.includes(fileType)) {
                    const uploadTask = storage.ref(`images/${fileName}`).put(this.state.fileName);
                    uploadTask.on(
                        'state_changed',
                        () => {
                            console.log('snapshot');
                        },
                        () => {
                            console.log('error');
                        },
                        () => {
                            storage.
                                ref('images').
                                child(fileName).
                                getDownloadURL().
                                then(async (url) => {
                                    const {
                                        companyName,
                                        jobTitle,
                                        jobLocation,
                                        jobLink,
                                        jobContent,
                                        tags
                                    } = this.state;
                                    const changes = await addJob({
                                        companyImage: url,
                                        companyName,
                                        jobTitle,
                                        jobLocation,
                                        jobLink,
                                        jobContent,
                                        tags
                                    });
                                    this.setState({...this.state, saved: changes.saved});
                                });
                        }
                    );
                }
            }
        }
    };

    render() {
        return (
            <div className='App'>
                <div style={{height: 10, background: '#00b7c2'}}/>
                <PageHeader
                    className='site-page-header'
                    onBack={() => this.props.history.push('/')}
                    title='Job Board'
                    subTitle='Add Job Post'
                />
                <Row>
                    <Col span={9}>
                        <Container>
                            <div
                                className='App-login'
                                style={{borderRadius: 0}}
                            >
                                <div style={{height: 10, background: '#00b7c2'}}/>
                                <div style={{width: '90%', marginLeft: '16px'}}>
                                    <div style={{marginTop: '4%'}}>
                                        <h4 style={head}>Job Post</h4>
                                    </div>
                                    <div style={{paddingTop: '4%'}}>
                                        <Avatar
                                            style={{marginLeft: 7}}
                                            shape='square'
                                            size='large'
                                            src={this.state.file}
                                        />
                                        <input
                                            type='file'
                                            onChange={this.onChange}
                                        />
                                    </div>
                                    <div style={{paddingTop: '4%'}}>
                                        <Input
                                            value={this.state.companyName}
                                            onChange={(e) => this.setState({...this.state, companyName: e.target.value})}
                                            placeholder='Company Name'
                                        />
                                    </div>
                                    <div style={{paddingTop: '4%'}}>
                                        <Input
                                            value={this.state.jobTitle}
                                            onChange={(e) => this.setState({...this.state, jobTitle: e.target.value})}
                                            placeholder='Job Title'
                                        />
                                    </div>
                                    <div style={{paddingTop: '4%'}}>
                                        <Input
                                            value={this.state.jobLocation}
                                            onChange={(e) => this.setState({...this.state, jobLocation: e.target.value})}
                                            placeholder='Job Location'
                                        />
                                    </div>
                                    <div style={{paddingTop: '4%'}}>
                                        <Input
                                            value={this.state.jobLink}
                                            onChange={(e) => this.setState({...this.state, jobLink: e.target.value})}
                                            placeholder='Job Link'
                                        />
                                    </div>
                                    <div style={{paddingTop: '4%'}}>
                                        <Input
                                            value={this.state.tags}
                                            onChange={(e) => this.setState({...this.state, tags: e.target.value})}
                                            placeholder='Tag1, Tag2'
                                        />
                                    </div>
                                    <div style={{paddingTop: '15%'}}>
                                        <Button
                                            onClick={() => this.postJob()}
                                            type='primary'
                                            style={{
                                                width: '100%',
                                                marginLeft: 4,
                                                marginTop: 4,
                                                backgroundColor: '#00b7c2',
                                                borderColor: '#00b7c2'
                                            }}
                                            size='large'
                                        >
                                            <div style={post}>Post Job</div>
                                        </Button>
                                    </div>
                                    <div style={{paddingTop: '4%', paddingBottom: '5%'}}>
                                        <Saved saved={this.state.saved}/>
                                    </div>
                                </div>
                            </div>
                        </Container>
                    </Col>
                    <Col span={2}/>
                    <Col span={13}>
                        <Container>
                            <div
                                className='App-description'
                                style={{borderRadius: 0}}
                            >
                                <div style={{height: 10, background: '#00b7c2'}}/>
                                <div style={{width: '90%', marginLeft: '16px'}}>
                                    <div style={{marginTop: '4%'}}>
                                        <h4 style={head}>Job Description</h4>
                                    </div>
                                    <div style={{paddingTop: '4%'}}>
                                        <TextArea
                                            value={this.state.jobContent}
                                            onChange={(e) => this.setState({jobContent: e.target.value})}
                                            rows={10}
                                            placeholder='Job Description'
                                        />
                                    </div>
                                </div>
                            </div>
                        </Container>
                    </Col>
                </Row>
            </div>
        );
    }
}

const Saved = ({saved}) => {
    if (saved === 1) {
        return (
            <Alert
                message='Changes Saved'
                type='success'
                showIcon={true}
            />
        );
    } else {
        return (
            <div/>
        );
    }
};


export default AddJob;