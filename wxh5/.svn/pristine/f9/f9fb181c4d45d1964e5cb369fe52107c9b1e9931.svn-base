<template>
  <div>
    <input class="uploader_input" type="file" accept="image/*" id="uploadImage" ref="upIMG"
           @change="upChange">
  </div>
</template>

<script>
  export default {
    name: "UploadImage",
    data() {
      return {
        uploadUrl: this.host + '/upload/uploadFile',
      }
    },
    methods: {
      upChange() {
        this.$vux.loading.show("正在上传");
        let timer;
        let THAT = this;
        // console.log(this.$refs.upIMG.files[0])
        let formData = new window.FormData();
        formData.append("file", this.$refs.upIMG.files[0]);
        this.$http.post(this.uploadUrl, formData).then(({data}) => {
          // console.log(response.data)
          if (data.code == '200') {
            this.$vux.loading.hide();
            clearTimeout(timer);
            this.$vux.toast.text('图片上传成功', 'center')
            this.$emit('resData', data.data);
            this.$refs.upIMG.value = "";//清空
          } else {
            this.$vux.loading.hide();
            this.$vux.toast.text('图片上传失败', 'center')
          }
        });
        timer = setTimeout(()=>{
          THAT.$vux.loading.hide();
          THAT.$vux.toast.show({
            text: '<p>正在后台上传</p><br/><p>稍后为您展示</p>',
            position: 'center',
            type:'text',
            width: '11em',
            time: '3000'
          });
        },5000)
      },//yes
    }
  }
</script>

<style scoped>
  .uploader_input {
    display: inline-block;
    width: 100%;
    height: 100%;
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
