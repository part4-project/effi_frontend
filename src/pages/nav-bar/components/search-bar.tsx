import Search from '@assets/icons/search.svg';
import styled from 'styled-components';

const SearchBar = () => {
  return (
    <S.SearchBarBox>
      <S.SearchInput type="text" name="search" id="search" />
      <S.SearchImgBox>
        <img src={Search} alt="search" />
      </S.SearchImgBox>
    </S.SearchBarBox>
  );
};

export default SearchBar;

const S = {
  SearchBarBox: styled.div`
    border-radius: 10px;
    background-color: #ffffff;
    width: 260px;
    position: relative;
    padding-block: 8px;
  `,
  SearchInput: styled.input`
    background-color: transparent;
    margin-left: 12px;
    width: 80%;
  `,
  SearchImgBox: styled.div`
    position: absolute;
    right: 3%;
    top: 20%;
  `,
};
