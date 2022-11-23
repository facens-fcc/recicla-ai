import React from 'react';
import style from './Home.module.css';
import Search from '../../components/Search/Search';
import earth from '../../assets/earth.png';
import earthDesktop from '../../assets/earth-desktop.png';

import Container from '../../components/Container/Container.jsx';
import CheckList from '../../components/CheckList/CheckList.jsx';
import Heading from '../../components/Heading/Heading.jsx';
import Stack from '../../components/Stack/Stack.jsx';
import Paragraph from '../../components/Paragraph/Paragraph.jsx';

const Home = () => {
  return (
    <main className="main">
      <section className={style.hero}>
        <Container>
          <h1 className={`display display--small ${style.hero__title}`}>Descarte o seu <em>lixo eletrônico</em> de forma consciente em <em>Sorocaba</em></h1>
          <Search />
        </Container>
      </section>

      <section className={style.whyRecycle} id="por-que-reciclar">
        <figure className={style.whyRecycle__quote}>
          <blockquote className={`${style.whyRecycle__quote__content} display display--medium`} cite="https://www.theworldcounts.com/challenges/waste/electronic-waste-facts">
            Mais de <span className="display__hightlight">80%</span> do lixo eletrônico e eletrodométisco não é reciclado
          </blockquote>
          <figcaption className={style.whyRecycle__quote__source}>
            —<cite>World Economic Forum</cite>
          </figcaption>
        </figure>
      </section>

      <section className={style.worldCount}>
        <figure className={style.worldCount__quote}>
          <blockquote className={style.quote__content} cite="https://www.theworldcounts.com/challenges/waste/electronic-waste-facts">
            <p className={`${style.worldCount__quote__title} display display--medium`}>Por ano, toneladas de lixo eletrônico são jogadas fora no mundo todo</p>
            <p className={`${style.worldCount__quote__text} display display--medium`}>...mais precisamente</p>
            <p className={`${style.worldCount__quote__number} display display--large`}>50.000.000t</p>
          </blockquote>
          <figcaption className={style.worldCount__quote__source}>
            <cite>— Fonte: The World Counts</cite>
          </figcaption>
        </figure>
        <div className={style.worldCount__earth}>
          <picture>
            <source media="(min-width: 768px)" srcSet={earthDesktop} />
            <img className={style.worldCount__earth__image} src={earth} alt="Imagem do planeta Terra" loading="lazy" />
          </picture>
          <p className={`${style.worldCount__earth__text} display display--medium`}>A mudança começa com você</p>
        </div>
      </section>

      <section className={style.benefits}>
        <Container variant="compact">
          <CheckList color="orange" layout="column">
            <CheckList.Item>
              <Stack size="small">
                <Heading level="h2">Salve o meio ambiente</Heading>
                <Paragraph color="sand">Reduzindo a extracão de matéria-prima para utilização nas indústrias.</Paragraph>
              </Stack>
            </CheckList.Item>
            <CheckList.Item>
              <Stack size="small">
                <Heading level="h2">Salve dinheiro</Heading>
                <Paragraph color="sand">Promovendo a ecônomia</Paragraph>
              </Stack>
            </CheckList.Item>
            <CheckList.Item>
              <Stack size="small">
                <Heading level="h2">Salve espaço</Heading>
                <Paragraph color="sand">Conservando recursos e energia</Paragraph>
              </Stack>
            </CheckList.Item>
            <CheckList.Item>
              <Stack size="small">
                <Heading level="h2">Salve vidas</Heading>
                <Paragraph color="sand">Evitando a contaminação</Paragraph>
              </Stack>
            </CheckList.Item>
            <CheckList.Item>
              <Stack size="small">
                <Heading level="h2">Salve o futuro</Heading>
                <Paragraph color="sand">Preservando o planeta</Paragraph>
              </Stack>
            </CheckList.Item>
            <CheckList.Item>
              <Stack size="small">
                <Heading level="h2">Beneficie a sua comunidade</Heading>
                <Paragraph color="sand">Contribuindo para o bem-estar</Paragraph>
              </Stack>
            </CheckList.Item>
          </CheckList>
        </Container>
      </section>
    </main>
  );
};

export default Home;
