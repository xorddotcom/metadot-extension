import { Modal } from '@mui/material';
import { Box } from '@mui/system';
import { MainHeading, SubHeading } from '../../CommonStyledComponents';
import SuccessCheckIcon from '../../../assets/images/succesTick.svg';

import { fonts } from '../../../utils';

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

function SuccessResponse({
  open, handleClose, style, mainText, subText,
}) {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style} className="warning-modal-style">
        <img src={SuccessCheckIcon} alt="success check" />
        <MainHeading className={mainHeadingfontFamilyClass} marginBottom="8px">
          {mainText}
        </MainHeading>
        {
          subText
        && (
        <SubHeading
          className={subHeadingfontFamilyClass}
          textAlignLast="center"
          textAlign="center"
          marginTop="0px"
        >
          {subText}
        </SubHeading>
        )
        }

      </Box>
    </Modal>
  );
}

export default SuccessResponse;
