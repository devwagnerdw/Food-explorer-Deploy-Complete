import { useState, useRef, useEffect } from 'react';
import { Container, Content } from "./styles";
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from "react-responsive";

import { api } from '../../services/api';

import { Menu } from "../../components/Menu";
import { Header } from '../../components/Header';
import { Section } from '../../components/Section';
import { Food } from "../../components/Food";
import { Footer } from '../../components/Footer';

import banner from "../../assets/banner.png";
import homeBanner from "../../assets/home-banner.png";

import { register } from 'swiper/element/bundle';

register();

export function Home({ isAdmin, user_id }) {
  const swiperElRef1 = useRef(null);
  const swiperElRef2 = useRef(null);
  const swiperElRef3 = useRef(null);

  const isDesktop = useMediaQuery({ minWidth: 1022 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5 
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          
          entry.target.swiper && entry.target.swiper.autoplay.start();
        } else {
          
          entry.target.swiper && entry.target.swiper.autoplay.stop();
        }        
      });
    }, options);

    
    observer.observe(swiperElRef1.current);
    observer.observe(swiperElRef2.current);
    observer.observe(swiperElRef3.current);

    return () => {
      observer.disconnect();
    }
  }, []);

  const [dishes, setDishes] = useState({ meals: [], desserts: [], beverages: [] });
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  function handleDetails(id) {
    navigate(`/dish/${id}`);
  }

  useEffect(() => {
    async function fetchDishes() {

       // Filtrando os pratos (dishes) em categorias específicas (refeições, sobremesas e bebidas)
      const response = await api.get(`/dishes?search=${search}`);
      const meals = response.data.filter(dish => dish.category === "meal");
      const beverages = response.data.filter(dish => dish.category === "beverage");
      const desserts = response.data.filter(dish => dish.category === "dessert");

      // Atualizando o estado (dishes) com os pratos filtrados nas categorias correspondentes
      setDishes({ meals, desserts, beverages });
    }

    fetchDishes();
  }, [search]);


  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {

        const response = await api.get("/favorites");
        const favorites = response.data.map((favorite) => favorite.dish_id);

        setFavorites(favorites);
      } catch (error) {
        console.log("");
      }
    };

    fetchFavorites();

  }, []);

  const updateFavorite = async (isFavorite, dishId) => {
    try {
            // Se o prato já for um favorito, realiza uma requisição DELETE para remover dos favoritos
      if (isFavorite) {
        await api.delete(`/favorites/${dishId}`);

        setFavorites((prevFavorites) =>
          prevFavorites.filter((favorite) => favorite !== dishId)
        );
      } else {
              // Se o prato não for um favorito, realiza uma requisição POST para adicionar aos favoritos
        await api.post('/favorites', { dish_id: dishId });

              // Atualiza o estado adicionando o prato à lista de favoritos
        setFavorites((prevFavorites) => [...prevFavorites, dishId]);
      }
    } catch (error) {
      console.log('Erro', error);
    }
  };

  return (
    <Container>
      {!isDesktop && 
        <Menu 
          isAdmin={isAdmin} 
          isMenuOpen={isMenuOpen} 
          setIsMenuOpen={setIsMenuOpen} 
          setSearch={setSearch}
        />
      }

      <Header 
        isAdmin={isAdmin} 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
        setSearch={setSearch}
      />

      <main>
        <div>
          <header>
            <img 
              src={isDesktop ? homeBanner : banner} 
              alt="Macarons coloridos em tons pastel." 
            />
          
            <div>
              <h1>Sabores Inigualáveis</h1>
              <p>Sinta O Cuidado do Preparo com ingredientes Selecionados</p>
            </div>
          </header>

          <Content>
            <Section title="Refeições">
              {/* Componente de seção com um título "Refeições" */}

              <swiper-container

                // Um componente de contêiner Swiper para exibir slides de refeições

                key={isDesktop}
                ref={swiperElRef1}
                space-between={isDesktop ? "27" : "16"}
                slides-per-view="auto"
                navigation={isDesktop ? "true" : "false"}
                loop="true"
                grab-cursor="true"
              >
                {
                  dishes.meals.map(dish => (
                    <swiper-slide key={String(dish.id)}>
                      <Food 
                        isAdmin={isAdmin}
                        data={dish}
                        isFavorite={favorites.includes(dish.id)}
                        updateFavorite={updateFavorite} 
                        user_id={user_id}
                        handleDetails={handleDetails}
                      />
                    </swiper-slide>
                  ))
                }
              </swiper-container>
            </Section>

            <Section title="Sobremesas">
              <swiper-container
                key={isDesktop}
                ref={swiperElRef2}
                slides-per-view="auto"
                space-between={isDesktop ? "27" : "16"}
                navigation={isDesktop ? "true" : "false"}
                loop="true"
                grab-cursor="true"
              >
                {
                  dishes.desserts.map(dish => (
                    <swiper-slide key={String(dish.id)}>
                      <Food 
                        isAdmin={isAdmin}
                        data={dish}
                        isFavorite={favorites.includes(dish.id)}
                        updateFavorite={updateFavorite} 
                        user_id={user_id}
                        handleDetails={handleDetails}
                      />
                    </swiper-slide>
                  ))
                }
              </swiper-container>
            </Section>

            <Section title="Bebidas">
              <swiper-container
                key={isDesktop}
                ref={swiperElRef3}
                space-between={isDesktop ? "27" : "16"}
                slides-per-view="auto"
                navigation={isDesktop ? "true" : "false"}
                loop="true"
                grab-cursor="true"
              >
                {
                  dishes.beverages.map(dish => (
                    <swiper-slide key={String(dish.id)}>
                      <Food 
                        isAdmin={isAdmin}
                        data={dish} 
                        isFavorite={favorites.includes(dish.id)}
                        updateFavorite={updateFavorite}
                        user_id={user_id}
                        handleDetails={handleDetails}
                      />
                    </swiper-slide>
                  ))
                }
              </swiper-container>
            </Section>
          </Content>
        </div>
      </main>

      <Footer />
    </Container>
  );
}