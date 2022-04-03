import React from 'react';
import { Container, Card, Table, Button, Modal, Form, Alert, Col, Row } from 'react-bootstrap';
import { faListAlt, faPlus, faEdit, faSave, faImages, faDeleteLeft, faHockeyPuck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Redirect, Link } from 'react-router-dom';
import api, { ApiResponse, apiFile } from '../../api/api';
import RoledMainMenu from '../RoledMainMenu/RoledMainMenu';
import ArticleType from '../../types/ArticleType';
import ApiArticleDto from '../../dtos/ApiArticleDto';
import CategoryType from '../../types/CategoryType';
import ApiCategoryDto from '../../dtos/ApiCategoryDto';



interface HomePageState {
    isUserLoggedIn: boolean;
    categories: CategoryType[];
  
  }
  
  export class Categories extends React.Component {
    state: HomePageState;
  
    constructor(props: Readonly<{}>) {
      super(props);
  
      this.state = {
        isUserLoggedIn: false,
        categories: [],
      };
    }
  
    componentDidMount() {
      this.getCategories();
    }
  
    componentDidUpdate() {
      this.getCategories();
    }
  
    private getCategories() {
      api('api/category/?filter=parentCategoryId||$isnull', 'get', {})
        .then((res: ApiResponse) => {
          if (res.status === "error" || res.status === "login") {
            this.setLogginState(false);
            return;
          }
  
          this.putCategoriesInState(res.data);
        });
    }
  
    private putCategoriesInState(data: ApiCategoryDto[]) {
      const categories: CategoryType[] = data?.map(category => {
        return {
          categoryId: category.categoryId,
          name: category.name,
          items: [],
        };
      });
  
      const newState = Object.assign(this.state, {
        categories: categories,
      })
  
      this.setState(newState);
    }
  
    private setLogginState(isLoggedIn: boolean) {
      const newState = Object.assign(this.state, {
        isUserLoggedIn: isLoggedIn,
      });
  
      this.setState(newState);
    }
  
    render() {
      if (this.state.isUserLoggedIn === true) {
        return (
          <Redirect to="/user/login/" />
        );
      }
  
      return (
        <Container>
          <RoledMainMenu role="user" />
          <Card>
            <Card.Body>
              <Card.Title>
                <FontAwesomeIcon icon={faListAlt} /> Top level categories
              </Card.Title>
  
              <Row>
                {this.state.categories.map(this.singleCategory)}
              </Row>
  
            </Card.Body>
          </Card>
        </Container>
      );
    }
  
    private singleCategory(category: CategoryType) {
      return (
        <Col lg="3" md="4" sm="6" xs="12">
          <Card className="mb-3" >
            <Card.Body>
              <Card.Title className="text-center" as="p">
                {category.name}
              </Card.Title>
              <Link to={`/category/${category.categoryId}`}
                className="btn btn-primary d-grid gap-2 btn-sm ">
                Open category</Link>
            </Card.Body>
          </Card>
        </Col>
      );
    }
  }
  