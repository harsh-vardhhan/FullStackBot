import styled from 'styled-components';
import React, {useState} from 'react';
import 'antd/dist/antd.css';
import './index.css';
import {Button, Input, Row, Col, Avatar, PageHeader, Alert} from 'antd';
import {useHistory} from 'react-router-dom';
import {editJob} from './Api';

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

function EditJob({location}) {
    const history = useHistory();

    const [companyName, setCompanyName] = useState(location.state.job.companyName);
    const [jobTitle, setJobTitle] = useState(location.state.job.jobTitle);
    const [jobLocation, setJobLocation] = useState(location.state.job.jobLocation);
    const [jobLink, setJobLink] = useState(location.state.job.jobLink);
    const [jobContent, setJobContent] = useState(location.state.job.jobContent);
    const [tags, setTags] = useState(location.state.job.tags);
    const [saved, setSaved] = useState(0);

    const loginHandle = async () => {
        const changes = await editJob({
            companyName,
            jobTitle,
            jobLocation,
            jobLink,
            jobContent,
            tags,
            jobId: location.state.job.jobId
        });
        setSaved(changes.saved);
    };

    return (
        <div className='App'>
            <div style={{height: 10, background: '#00b7c2'}}/>
            <PageHeader
                className='site-page-header'
                onBack={() => history.push('/')}
                title='Job Board'
                subTitle='Edit Job Post'
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
                                        src={location.state.job.companyImage}
                                    />
                                </div>
                                <div style={{paddingTop: '4%'}}>
                                    <Input
                                        value={companyName}
                                        onChange={(e) => setCompanyName(e.target.value)}
                                        placeholder='Company Name'
                                    />
                                </div>
                                <div style={{paddingTop: '4%'}}>
                                    <Input
                                        value={jobTitle}
                                        onChange={(e) => setJobTitle(e.target.value)}
                                        placeholder='Job Title'
                                    />
                                </div>
                                <div style={{paddingTop: '4%'}}>
                                    <Input
                                        value={jobLocation}
                                        onChange={(e) => setJobLocation(e.target.value)}
                                        placeholder='Job Location'
                                    />
                                </div>
                                <div style={{paddingTop: '4%'}}>
                                    <Input
                                        value={jobLink}
                                        onChange={(e) => setJobLink(e.target.value)}
                                        placeholder='Job Link'
                                    />
                                </div>
                                <div style={{paddingTop: '4%'}}>
                                    <Input
                                        value={tags}
                                        onChange={(e) => setTags(e.target.value)}
                                        placeholder='Tags'
                                    />
                                </div>
                                <div style={{paddingTop: '15%'}}>
                                    <Button
                                        onClick={() => loginHandle()}
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
                                        <div style={post}>Save</div>
                                    </Button>
                                </div>
                                <div style={{paddingTop: '4%', paddingBottom: '5%'}}>
                                    <Saved saved={saved}/>
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
                                        value={jobContent}
                                        onChange={(e) => setJobContent(e.target.value)}
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

export default EditJob;