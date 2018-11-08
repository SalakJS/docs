/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');
const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

const translate = require('../../server/translate.js').translate;
const translation = require('../../server/translation.js');
const idx = (target, path) =>
  path.reduce((obj, key) => (obj && obj[key] ? obj[key] : null), target);

const siteConfig = require(process.cwd() + '/siteConfig.js');

function imgUrl(img) {
  return siteConfig.baseUrl + 'img/' + img;
}

function docUrl(doc, language) {
  return siteConfig.baseUrl + 'docs/' + (language ? language + '/' : '') + doc;
}

function pageUrl(page, language) {
  return siteConfig.baseUrl + (language ? language + '/' : '') + page;
}

class Button extends React.Component {
  render() {
    return (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={this.props.href} target={this.props.target}>
          {this.props.children}
        </a>
      </div>
    );
  }
}

Button.defaultProps = {
  target: '_self',
};

const SplashContainer = props => (
  <div className="homeContainer">
    <div className="homeSplashFade">
      <div className="wrapper homeWrapper">{props.children}</div>
    </div>
  </div>
);

const Logo = props => (
  <div className="projectLogo">
    <img src={props.img_src} />
  </div>
);

const ProjectTitle = props => (
  <h2 className="projectTitle">
    {siteConfig.title}
    <small>
      {idx(translation, [
        props.language,
        'localized-strings',
        'tagline',
      ]) || siteConfig.tagline}
    </small>
  </h2>
);

const PromoSection = props => (
  <div className="section promoSection">
    <div className="promoRow">
      <div className="pluginRowBlock">{props.children}</div>
    </div>
  </div>
);

const GithubButton = () => (
  <div className="githubButton" style={{minHeight: '20px'}}>
    <a
      className="github-button"
      href={siteConfig.repoUrl}
      data-icon="octicon-star"
      data-count-href="/salakjs/salak/stargazers"
      data-show-count={true}
      data-count-aria-label="# stargazers on GitHub"
      aria-label="Star salakjs/salak on GitHub"
    >
      Star
    </a>
  </div>
)

class HomeSplash extends React.Component {
  render() {
    let language = this.props.language || '';
    // <Button href="#try">Try It Out</Button>
    return (
      <SplashContainer>
        <div className="inner">
          <ProjectTitle language={language} />
          <PromoSection>
            <Button href={docUrl('introduction.html', language)}>
              <translate>Get Started</translate>
            </Button>
          </PromoSection>
          <GithubButton />
        </div>
      </SplashContainer>
    );
  }
}

const Block = props => (
  <Container
    padding={['bottom', 'top']}
    id={props.id}
    background={props.background}>
    <GridBlock align={props.align || 'center'} contents={props.children} layout={props.layout} />
  </Container>
);

const Features = props => (
  <Block layout="fourColumn" background="light">
    {[
      {
        content: <translate>It use swagger to generate docs.</translate>,
        image: imgUrl('index/doc.png'),
        imageAlign: 'top',
        title: <translate>Auto Documents</translate>,
      },
      {
        content: <translate>Base on Koa.js, it can use koa lifecycle.</translate>,
        image: imgUrl('index/extend.png'),
        imageAlign: 'top',
        title: <translate>Base on Koa</translate>,
      },
      {
        content: <translate>It has powerful plugins.</translate>,
        image: imgUrl('index/plugin.png'),
        imageAlign: 'top',
        title: <translate>Powerful Plugin</translate>,
      },
    ]}
  </Block>
);

const Documents = props => (
  <Block align="left">
    {[
      {
        content: <translate>It's an example for documents.</translate>,
        image: imgUrl('index/api-docs.png'),
        imageAlign: 'right',
        title: <translate>Documents Example</translate>,
      },
    ]}
  </Block>
);

const Showcase = props => {
  if ((siteConfig.users || []).length === 0) {
    return null;
  }
  const showcase = siteConfig.users
    .filter(user => {
      return user.pinned;
    })
    .map((user, i) => {
      return (
        <a href={user.infoLink} key={i}>
          <img src={user.image} alt={user.caption} title={user.caption} />
        </a>
      );
    });

  return (
    <div className="productShowcaseSection paddingBottom">
      <h2>{"Who's Using This?"}</h2>
      <p>This project is used by all these people</p>
      <div className="logos">{showcase}</div>
      <div className="more-users">
        <a className="button" href={pageUrl('users.html', props.language)}>
          More {siteConfig.title} Users
        </a>
      </div>
    </div>
  );
};

class Index extends React.Component {
  render() {
    let language = this.props.language || '';

    return (
      <div>
        <HomeSplash language={language} />
        <div className="mainContainer">
          <Features language={language} />
          <Documents language={language} />
        </div>
      </div>
    );
  }
}

module.exports = Index;
