import React from 'react';
import { OptionDiv, Option } from '../../style';
import { OptionsInterface } from '../../type';
import { fonts } from '../../../../utils';

const index: React.FunctionComponent<OptionsInterface> = ({
    importButtonHandler,
    uploadButtonHandler,
    selectedType,
}) => {
    const { mainHeadingfontFamilyClass } = fonts;
    return (
        <OptionDiv>
            <Option
                id="seed-phrase"
                className={mainHeadingfontFamilyClass}
                selected={selectedType === 'seed'}
                onClick={importButtonHandler}
            >
                Seed Phrase
            </Option>
            <div className="normalTooltip">
                <Option
                    id="upload-file"
                    onClick={uploadButtonHandler}
                    className={mainHeadingfontFamilyClass}
                    selected={selectedType === 'json'}
                >
                    Upload Json
                </Option>
            </div>
        </OptionDiv>
    );
};

export default index;
