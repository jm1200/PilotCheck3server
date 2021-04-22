export const registerMutation = `
mutation Register($options:EmailPasswordInput!){
    register(options:$options){
      errors{
        field
        message
      }
      user{
        id
        email
        createdAt
        updatedAt
        
      }
    }
  }
      
      `;

export const loginMutation = `
mutation Login($options:EmailPasswordInput!){
    login(options:$options){
      errors{
        field
        message
      }
      user{
        id
        email
        createdAt
        updatedAt
        
      }
    }
  }
      
      `;

export const logoutMutation = `
      mutation Logout {
          logout
      }
      `;
