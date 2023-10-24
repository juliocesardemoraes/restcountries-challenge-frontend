"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "@/styles/Home.module.css";
import { ICountryInfo } from "@/types/interface";

export default function SearchCountries() {
  const [country, setCountry] = useState<ICountryInfo | null>(null);
  const [search, setSearch] = useState<string>("");
  const [imageSrc, setImageSrc] = useState<string>("");

  const buscarPais = async () => {
    if (search.length === 0) return;

    async function searchCountriesInfo() {
      const response = await fetch(
        `https://restcountries-challenge-backend.vercel.app/countries/?pais=${search}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ); // Buscando informações em outro site
      const countryInfo = await response.json(); // Pega o JSON da resposta
      setCountry(countryInfo?.pais?.[0]);
    }
    searchCountriesInfo();
  };

  useEffect(() => {
    if (!country) return;

    async function searchCountriesInfo() {
      const myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        "aBRkCK9ieZO4sFq6zVw9GCPFnpAW4wNRZesxextV2X0kFmlsAcMEYyjQ"
      );
      myHeaders.append(
        "Cookie",
        "__cf_bm=JYp3NF0LFYCW0kdfU6nJ4SbSWsENIpwu7P.bE95HOp0-1698107254-0-Ade2cPPsC+E3sDJa1HQSu7Jdhypaxk/BG76wQtl55aN6WrXA2XmTCbjIMfn3EBjvrYkIRMr+g0veBCueBbcawus="
      );

      const image = await fetch(
        `https://api.pexels.com/v1/search?query=${country?.name?.common} landscape&per_page=1&orientation=landscape`,
        {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        }
      );

      const imageInfo = await image.json();
      setImageSrc(imageInfo?.photos[0]?.src?.original);
    }
    searchCountriesInfo();
  }, [country]);

  return (
    <div>
      {imageSrc && (
        <>
          <div className={`${styles.image__background__shadow}`} />

          <Image
            className={`${styles.image__background}`}
            width={500}
            height={500}
            src={imageSrc}
            alt={"Imagem do pais"}
            quality={100}
            unoptimized={true}
          ></Image>
        </>
      )}

      <div
        className={`${styles.search__container}`}
        onClick={() => {
          buscarPais();
        }}
      >
        <Image
          width={32}
          height={32}
          alt={"Imagem de uma lupa"}
          src="./lupa.svg"
        ></Image>
        <input
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          placeholder="Procure por informações de um país"
        ></input>
      </div>
      <div className={`${styles.country__info}`}>
        <h2>{country?.continents[0]}</h2>
        <h1>{country?.name?.common}</h1>
      </div>
    </div>
  );
}

// Inicialização - Montagem
// Update - Atualização
// Desmontagem
