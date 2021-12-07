import { gql } from "@apollo/client"

export const GET_USER_BY_PHONE = gql`
  query getAccountDetailsByUserPhone($phone: Phone!) {
    accountDetails: accountDetailsByUserPhone(phone: $phone) {
      id
      username
      level
      status
      title
      owner {
        id
        language
        phone
      }
      coordinates {
        latitude
        longitude
      }
      createdAt
    }
  }
`

export const GET_USER_BY_USERNAME = gql`
  query getAccountDetailsByUsername($username: Username!) {
    accountDetails: accountDetailsByUsername(username: $username) {
      id
      username
      level
      status
      title
      owner {
        id
        language
        phone
      }
      coordinates {
        latitude
        longitude
      }
      createdAt
    }
  }
`

export const USER_UPDATE_STATUS = gql`
  mutation userUpdateStatus($input: UserUpdateStatusInput!) {
    mutationData: userUpdateStatus(input: $input) {
      errors {
        message
      }
      userDetails {
        __typename
        id
        phone
        username
        level
        status
        title
        coordinates {
          latitude
          longitude
        }
        createdAt
      }
    }
  }
`

export const USER_UPDATE_LEVEL = gql`
  mutation userUpdateLevel($input: UserUpdateLevelInput!) {
    mutationData: userUpdateLevel(input: $input) {
      errors {
        message
      }
      userDetails {
        id
        phone
        username
        level
        status
        title
        coordinates {
          latitude
          longitude
        }
        createdAt
      }
    }
  }
`

export const BUSINESS_UPDATE_MAP_INFO = gql`
  mutation businessUpdateMapInfo($input: BusinessUpdateMapInfoInput!) {
    mutationData: businessUpdateMapInfo(input: $input) {
      errors {
        message
      }
      userDetails {
        id
        phone
        username
        level
        status
        title
        coordinates {
          latitude
          longitude
        }
        createdAt
      }
    }
  }
`
