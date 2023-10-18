import * as C from "./styles";
import usePagination from "@mui/material/usePagination";
import { ReactComponent as LeftArrowIcon } from "../../assets/icon-arrow-left.svg";
import { ReactComponent as RightArrowIcon } from "../../assets/icon-arrow-right.svg";
import { Pokemon } from "../../types/Pokemon";
import { fetchAllPokemon, fetchPokemonList } from "../../api/fetchPokemonList";
import { useEffect, useRef, useState } from "react";
import { ReactComponent as SearchIcon } from "../../assets/icon-search.svg";
import { useKeyDownHook } from "../../hooks/useKeyPress";

type UsePaginationProps = {
  setPokemonList: (data: Pokemon[]) => void;
  setLoading: (value: boolean) => void;
  searchBarRef: React.MutableRefObject<HTMLDivElement>;
  page: number;
  setPage: (value: number) => void;
};

export default function UsePagination(props: UsePaginationProps) {
  const [paginationLimit, setPaginationLimit] = useState(0);
  const [value, setValue] = useState(1);
  const max = paginationLimit;
  const ref = useRef<HTMLInputElement>(null);

  //useKeyDownHook(() => handleChange(null, value));

  const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value);
    if (newValue > max) {
      setValue(max);
    } else {
      setValue(newValue == 0 ? 1 : newValue);
    }
  };

  const handleChange = async (e: React.ChangeEvent<unknown>, value: number) => {
    props.setPage(value);
    props.setLoading(true);
    props.setPokemonList(await fetchPokemonList(value));
    props.setLoading(false);

    window.scrollTo({
      top: props.searchBarRef.current.offsetTop - 56,
    });
  };

  useEffect(() => {
    const getPaginationLimit = async () => {
      const data = await fetchAllPokemon();
      setPaginationLimit(data.length / 21);
    };

    getPaginationLimit();
  }, []);

  const { items } = usePagination({
    count: paginationLimit,
    siblingCount: 0,
    page: props.page,
    onChange: handleChange,
  });

 

  return (
    <nav>
      <C.Pagination>
        {items.map(({ page, type, selected, ...item }, index) => {
          let children = null;

          if (type === "start-ellipsis" || type === "end-ellipsis") {
            children = <C.Ellipsis>...</C.Ellipsis>;
          } else if (type === "page") {
            children = (
              <C.Button {...item} selected={selected}>
                {page?.toFixed()}
              </C.Button>
            );
          } else {
            children = (
              <C.Button {...item} navigation>
                {type === "previous" ? <LeftArrowIcon /> : <RightArrowIcon />}
              </C.Button>
            );
          }

          return <li key={index}>{children}</li>;
        })}
        <div className="page__search">
          <input
            ref={ref}
            type="number"
            className="input__page__number"
            min="1"
            max={max}
            defaultValue={props.page?.toFixed()}
            onChange={(e) => handleChangeValue(e)}
          />
          <C.SearchButton onClick={(e) => handleChange(e, value)}>
            <SearchIcon />
          </C.SearchButton>
        </div>
      </C.Pagination>
    </nav>
  );
}
