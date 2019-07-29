const xhr = new XMLHttpRequest();
xhr.open('get', 'http://127.0.0.1:8080/getAllHeros');
xhr.send();
xhr.onreadystatechange = function () {
    if (xhr.Status === 200 && res.readyState === 4) {
        let res = JSON.parse(rhr.responseText);
        let html = '';
        res.forEach(e => {
            html += `<tr>
      <td>${e.id}</td>
      <td>${e.name}</td>
      <td>${e.gender}</td>
      <td><img src="${e.img}"></td>
      <td>
        <a href="./edit.html?id=${e.id}">修改</a> 
        <a data-id="${e.id}" href="javascript:void(0);">删除</a>
      </td>
    </tr>`;
        });
        tbody.innerHTML = html;
    }
}