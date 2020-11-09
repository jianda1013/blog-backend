# blog-backend

## requirement: 
- node.js
- nodemon

## sql table

### user_tables

<table>
  <tr>
    <td>account</td>
    <td>account to login</td>
  </tr>
  <tr>
    <td>passwd</td>
    <td>password that after hash</td>
  <tr>
    <td>user_name</td>
    <td>user name</td>
  </tr>
  <tr>
    <td>create_at</td>
    <td>account create datetime</td>
  </tr>
  <tr>
    <td>update_at</td>
    <td>account update datetime</td>
  </tr>
  <tr>
    <td>last_login</td>
    <td>account last login datetime<td>
  </tr>
</table>

### article_tables

<table>
  <tr>
    <td>id</td>
    <td>article id to display</td>
  </tr>
  <tr>
    <td>title</td>
    <td>article title</td>
  <tr>
    <td>group</td>
    <td>what kind of group should be of the article</td>
  </tr>
  <tr>
    <td>text</td>
    <td>text of the article</td>
  </tr>
  <tr>
    <td>create_at</td>
    <td>article create datetime</td>
  </tr>
  <tr>
    <td>update_at</td>
    <td>article last update datetime<td>
  </tr>
</table>
