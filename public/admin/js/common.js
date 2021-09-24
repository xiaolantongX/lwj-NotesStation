  // 将serializeArray获取到的表单数组转换成json对象
function serializeArrayToJson(form) {
    const formData = {}
    const formArray = form.serializeArray()
    formArray.forEach(item => {
        formData[item.name] = item.value
    })
    return formData
}
