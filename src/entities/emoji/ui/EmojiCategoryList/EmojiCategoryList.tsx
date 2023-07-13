import classNames from 'classnames';
import { Tooltip } from '@shared/components';
import { emojiCategoryNamesEngToRus, emojisCategoryList } from '@entities/emoji/model/emojisCategoryList';
import s from './emojicategorylist.module.css';

type Props = {
  onClick: (index: number) => void;
};

export const EmojiCategoryList: React.FC<Props> = ({ onClick }): JSX.Element => {
  const renderList = () => {
    return emojisCategoryList.map((category, i) => {
      return (
        <Tooltip
          key={category.name}
          position="right"
          positioning="absolute"
          text={emojiCategoryNamesEngToRus[category.name]}
        >
          <div onClick={() => onClick(i)} className={classNames(s.categoryIcon, 'flex flexaic flexjcc')}>
            {category.emojiIcon}
          </div>
        </Tooltip>
      );
    });
  };

  return <div className={classNames(s.categoryList, 'flex flexcolumn flexaic flexjcsb')}>{renderList()}</div>;
};
