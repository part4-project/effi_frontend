import styled, { useTheme } from 'styled-components';

const SearchBar = () => {
  const theme = useTheme();
  return (
    <S.SearchBarBox>
      <S.SearchInput type="text" name="search" id="search" />
      <S.SearchImgBox>
        <img src={theme.search} alt="search" />
      </S.SearchImgBox>
    </S.SearchBarBox>
  );
};

export default SearchBar;

const S = {
  SearchBarBox: styled.div`
    border-radius: 10px;
    background-color: ${(props) => props.theme.theme07};
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
