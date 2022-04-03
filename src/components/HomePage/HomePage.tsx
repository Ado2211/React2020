import React from 'react';
import { Container, Card, Table, Button, Modal, Form, Alert, Col, Row } from 'react-bootstrap';
import { faListAlt, faPlus, faEdit, faSave, faImages, faDeleteLeft, faHockeyPuck, faListSquares } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Redirect, Link } from 'react-router-dom';
import api, { ApiResponse, apiFile } from '../../api/api';
import RoledMainMenu from '../RoledMainMenu/RoledMainMenu';
import ArticleType from '../../types/ArticleType';
import ApiArticleDto from '../../dtos/ApiArticleDto';
import CategoryType from '../../types/CategoryType';
import ApiCategoryDto from '../../dtos/ApiCategoryDto';
import SingleArticlePreview from '../SingleArticlePreview/SingleArticlePreview';
import CategoryPage from '../CategoryPage/CategoryPage';






interface AH8q3dGK2f2vLZVgbRfLTjQPySe2yRaJHs {
  isUserLoggedIn: boolean;
  articles: ArticleType[];
  categories: CategoryType[];
  status: string[];
  filters: {
    keywords: string;
    priceMininum: number;
    priceMaximum: number;
    order: "name asc" | "name desc" | "price asc" | "price desc";
    selectedFeatures: {
        featureId: number;
        value: string;
    }[];
};
features: {
    featureId: number;
    name: string;
    values: string[];
}[];
  
}

interface FeatureBaseType {
  featureId: number;
  name: string;
}

class HomePage extends React.Component {
  state: AH8q3dGK2f2vLZVgbRfLTjQPySe2yRaJHs;

  constructor(props: Readonly<{}>) {
    super(props);

    this.state = {
      isUserLoggedIn: true,
      articles: [],
      categories: [],
      status: [
        "available",
        "visible",
        "hidden",
      ],

      filters: {
        keywords: '',
        priceMininum: 0.01,
        priceMaximum: 100000,
        order: "price asc",
        selectedFeatures: [],
    },
    features: [],
    };
  }

  

  componentDidMount() {
    this.getCategories();
    this.getArticles();
  }

  private async getFeaturesByCategoryId(categoryId: number): Promise<FeatureBaseType[]> {
    return new Promise(resolve => {
      api('/api/feature/?filter=categoryId||$eq||' + categoryId + '/', 'get', {}, 'user')
        .then((res: ApiResponse) => {
          if (res.status === "error" || res.status === "login") {
            this.setLogginState(false);
            return resolve([]);
          }

          const features: FeatureBaseType[] = res.data.map((item: any) => ({
            featureId: item.featureId,
            name: item.name,
          }));

          resolve(features);
        })
    })
  }

  private getCategories() {
    api('/api/category/', 'get', {}, 'user')
      .then((res: ApiResponse) => {
        if (res.status === "error" || res.status === "login") {
          this.setLogginState(false);
          return;
        }

        this.putCategoriesInState(res.data);
      });
  }

  private putCategoriesInState(data?: ApiCategoryDto[]) {
    const categories: CategoryType[] | undefined = data?.map(category => {
      return {
        categoryId: category.categoryId,
        name: category.name,
        imagePath: category.imagePath,
        parentCategoryId: category.parentCategoryId,
      };
    });

    this.setState(Object.assign(this.state, {
      categories: categories,
    }));
  }

  private getArticles() {
    api('/api/article/?join=articleFeatures&join=features&join=articlePrices&join=photos&join=category', 'get', {}, 'user')
      .then((res: ApiResponse) => {
        if (res.status === "error" || res.status === "login") {
          this.setLogginState(false);
          return;
        }

        this.putArticlesInState(res.data);
      });
  }

  private putArticlesInState(data?: ApiArticleDto[]) {
    const articles: ArticleType[] | undefined = data?.map(article => {
      return {
        articleId: article.articleId,
        name: article.name,
        excerpt: article.excerpt,
        description: article.description,

        price: article.articlePrices[article.articlePrices.length - 1].price,
        status: article.status,
        isPromoted: article.isPromoted,
        articleFeatures: article.articleFeatures,
        features: article.features,
        articlePrices: article.articlePrices,
        photos: article.photos,
        category: article.category,
        categoryId: article.categoryId,
      };
    });

    this.setState(Object.assign(this.state, {
      articles: articles,
    }));
  }

  private setLogginState(isLoggedIn: boolean) {
    this.setState(Object.assign(this.state, {
      isUserLoggedIn: isLoggedIn,
    }));
  }

  

  render() {
    if (this.state.isUserLoggedIn === false) {
      return (
        <Redirect to="/user/login" />
      );
    }

    return (
      <>



        <Container>
          <RoledMainMenu role="user" />

          <Container>
            <Link to="/user/categories/" className="btn btn-sm btn-info">
              <FontAwesomeIcon icon={faListSquares} /> Categories
            </Link>
          </Container>

          <Card>
            <Card.Body>
              <Card.Title>
                <FontAwesomeIcon icon={faListAlt} /> All Articles
              </Card.Title>


              <Row>
             

                <Col xs="12" md="12" lg="12">
                  {this.showArticles()}
                </Col>
              </Row>


            </Card.Body>
          </Card>
        </Container>
      </>
    );
  }

 

  private showArticles() {
    if (this.state.articles?.length === 0) {
      return (
        <div>There are no articles in this category.</div>
      );
    }

    return (
      <Row>
        {this.state.articles?.map(this.singleArticle)}
      </Row>
    );

  }

  private singleArticle(article: ArticleType) {
    return (
      <SingleArticlePreview article={article} key={'Article ' + article.articleId} />
    );
  }
}



export default HomePage