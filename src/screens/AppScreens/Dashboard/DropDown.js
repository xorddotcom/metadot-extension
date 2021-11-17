import React from 'react';
import styled from 'styled-components';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { fonts, colors } from '../../../utils';

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;
const { primaryTextColor } = colors;

const DropDownMenu = styled.ul`
    color: ${primaryTextColor};
    list-style: none;
    padding-bottom: 0.8rem;
    padding: 0;
`;

const MainHeading = styled.h4`
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 2%;
    text-align: center;
    margin-top: 0.4rem;
    margin-left: -45%;
`;

const List = styled.li`
    width: 150%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.5rem;
    padding: 0.2rem 0.3rem;
    cursor: pointer;
`;

const IconLabel = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

const DropDown = () => (
  <DropDownMenu className={subHeadingfontFamilyClass}>
    <MainHeading className={mainHeadingfontFamilyClass}>My Profile</MainHeading>
    <List>
      <IconLabel>
        <PersonOutlinedIcon style={{ fontSize: '0.7rem' }} />
        &nbsp; &nbsp;
        Accounts
      </IconLabel>
      <div style={{ float: 'right' }}>
        <ChevronRightOutlinedIcon style={{ fontSize: '0.7rem' }} />
      </div>
    </List>
    <List>
      <IconLabel>
        <AddOutlinedIcon style={{ fontSize: '0.7rem' }} />
        &nbsp; &nbsp;
        Add Account
      </IconLabel>
      <div>
        <ChevronRightOutlinedIcon style={{ fontSize: '0.7rem' }} />
      </div>
    </List>
    <List>
      <IconLabel>
        <FileDownloadOutlinedIcon style={{ fontSize: '0.7rem' }} />
        &nbsp; &nbsp;
        Import Account
      </IconLabel>
      <div>
        <ChevronRightOutlinedIcon style={{ fontSize: '0.7rem' }} />
      </div>
    </List>
    <List>
      <IconLabel>
        <FileUploadOutlinedIcon style={{ fontSize: '0.7rem' }} />
        &nbsp; &nbsp;
        Export Account
      </IconLabel>
      <div>
        <ChevronRightOutlinedIcon style={{ fontSize: '0.7rem' }} />
      </div>
    </List>
    <List>
      <IconLabel>
        <ForumOutlinedIcon style={{ fontSize: '0.7rem' }} />
        &nbsp; &nbsp;
        Support
      </IconLabel>
      <div>
        {/* <ChevronRightOutlinedIcon style={{ fontSize: '0.7rem' }} /> */}
      </div>
    </List>
    <List>
      <IconLabel>
        <SettingsOutlinedIcon style={{ fontSize: '0.7rem' }} />
        &nbsp; &nbsp;
        Setting
      </IconLabel>
      <div>
        <ChevronRightOutlinedIcon style={{ fontSize: '0.7rem' }} />
      </div>
    </List>
    <List>
      <IconLabel>
        <LockOutlinedIcon style={{ fontSize: '0.7rem' }} />
        &nbsp; &nbsp;
        Lock
      </IconLabel>
      <div>
        {/* <ChevronRightOutlinedIcon style={{ fontSize: '0.7rem' }} /> */}
      </div>
    </List>
  </DropDownMenu>
);

export default DropDown;
