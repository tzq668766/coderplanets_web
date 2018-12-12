/*
 *
 * ErrorPage
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { withTheme } from 'styled-components'

import { ICON_CMD } from '../../config'

import NotFoundMessage from './NotFoundMessage'
import ErrorDesc from './ErrorDesc'

import {
  Container,
  HintWrapper,
  IconsWrapper,
  TextWrapper,
  HintTitle,
  LogoWrapper,
  ErrorDivider,
  ErrorNumber,
  Error404Icon,
  CPSMdLogo,
  FooterWrapper,
} from './styles'

import { makeDebugger } from '../../utils'

/* eslint-disable no-unused-vars */
const debug = makeDebugger('c:ErrorPage:index')
/* eslint-enable no-unused-vars */

const ErrorPage = ({ errorCode, page, target }) => (
  <Container>
    <LogoWrapper>
      <CPSMdLogo src={`${ICON_CMD}/cps_logo_md.png`} />
    </LogoWrapper>
    <HintWrapper>
      <IconsWrapper>
        <Error404Icon src={`${ICON_CMD}/cry.svg`} />
        <ErrorDivider />
        <ErrorNumber>{errorCode}</ErrorNumber>
      </IconsWrapper>
      <TextWrapper>
        {errorCode === 404 ? (
          <NotFoundMessage page={page} target={target} />
        ) : (
          <HintTitle>服务器内部发生错误</HintTitle>
        )}
        <ErrorDesc errorCode={errorCode} />
      </TextWrapper>
    </HintWrapper>
    <FooterWrapper />
  </Container>
)

ErrorPage.propTypes = {
  errorCode: PropTypes.number,
  page: PropTypes.string,
  target: PropTypes.string,
}

ErrorPage.defaultProps = {
  errorCode: 404,
  page: '',
  target: '',
}

export default withTheme(ErrorPage)
