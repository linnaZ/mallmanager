<template>
  <el-card shadow="always" class="card">
    <my-bread level1="商品管理" level2="商品列表"></my-bread>
    <el-alert title="添加商品信息" type="info" center show-icon class="alert"></el-alert>
    <el-steps :space="200" :active="1*active" finish-status="success" align-center class="step">
      <el-step title="商品信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
    </el-steps>

    <!-- tab表单 -->
    <el-form
      label-position="top"
      label-width="80px"
      :model="form"
      style="height:400px; overflow:auto;"
    >
      <el-tabs v-model="active" tab-position="left" @tab-click="tabchange()">
        <el-tab-pane label="商品信息" name="1">
          <el-form label-position="top" label-width="80px" :model="goodsForm">
            <el-form-item label="商品名称">
              <el-input v-model="goodsForm.name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格">
              <el-input v-model="goodsForm.price"></el-input>
            </el-form-item>
            <el-form-item label="商品重量">
              <el-input v-model="goodsForm.weight"></el-input>
            </el-form-item>
            <el-form-item label="商品数量">
              <el-input v-model="goodsForm.number"></el-input>
            </el-form-item>
            <el-form-item label="商品分类">
              {{selectedOptions}}
              <el-cascader
                expand-trigger="hover"
                :options="options"
                v-model="selectedOptions"
                @change="handleChange"
                :props="defaultprops"
              ></el-cascader>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="商品参数" name="2">
          <el-form-item :label="item1.attr_name" v-for="(item1,index) in arrDtparams" :key="index">
            <el-checkbox-group v-model="item1.attr_vals">
              <el-checkbox
                :label="item2"
                v-for="(item2,index) in item1.attr_vals"
                :key="index"
                border
              ></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品属性" name="3">
          <el-form-item :label="item.attr_name" v-for="(item,index) in arrStaParams" :key="index">
            <el-input v-model="item.attr_vals"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品图片" name="4">
          <el-upload
            class="upload-demo"
            action="http://localhost:8888/api/private/v1/upload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="handelsuccess"
            :file-list="fileList"
            :headers="header"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-tab-pane>
        <el-tab-pane label="商品内容" name="5">
            <el-button type="primary" @click="addGoods()">添加商品</el-button>
            <quill-editor ></quill-editor>

        </el-tab-pane>
      </el-tabs>
    </el-form>
  </el-card>
</template>

<script>

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

export default {
    // 富文本编辑器组件导入
    components:{
        quillEditor
    },
  data() {
    return {
      form: {
        goods_name: "",
        goods_price: "",
        goods_number: "",
        goods_weight: "",
        goods_introduce: "",
        goods_cat: "",
        pics: [],
        attrs: []
      },
      active: "1",
      goodsForm: {
        name: "",
        price: "",
        weight: "",
        number: ""
      },
      options: [],
      selectedOptions: [1, 3, 6],
      defaultprops: {
        label: "cat_name",
        value: "cat_id",
        children: "children"
      },

      //   动态参数
      arrDtparams: [],
      //   静态参数
      arrStaParams: [],
      //   上传的文件列表
      fileList: [],
    //   除了登录其他请求都要设置头部信息
      header: {
        Authorization: localStorage.getItem("token")
      }
    };
  },

  mounted() {
    this.getGoodCate();
  },

  methods: {
    //   添加商品
// goods_name	商品名称	不能为空
// goods_cat	以为','分割的分类列表	不能为空
// goods_price	价格	不能为空
// goods_number	数量	不能为空
// goods_weight	重量	不能为空

// goods_introduce	介绍	可以为空
// pics	上传的图片临时路径（对象）	可以为空
// attrs	商品的参数（数组）	可以为空
    async addGoods(){

        // 处理数据
        // goods_cat	以为','分割的分类字符串不能为空
            this.form.goods_cat=this.selectedOptions.join(',')

        // pics	为每一项为对象的数组  在handelsuccess方法和handelRemove方法中处理


        const res=await this.$http.post('goods',this.form)
        console.log(res)
    },

    
    //   文件上传成功
    handelsuccess(file) {
      console.log("成功");
      console.log(file);
    //  将添加成功的图片的临时路径添加到pics数组中
      this.form.pics.push({
          pic:file.data.tmp_path
      })
      
    },

    //   移除图片
    handleRemove(file, fileList) {
    //     console.log('移除')
    //   console.log(file);

    //   移除form表单pics数组的对应图片路径
    // 找对应的index值    findIndex(function(){})  循环遍历数据把找到符合的index 值返回
    let index=this.form.pics.findIndex(item=>{
        return item.pic=file.response.data.tmp_path
    })
    this.form.pics.splice(index,1)

    // console.log(this.form.pics)
    //   file.response.data.tmp_path     //图片的临时路径
    },


    //   图片预览
    handlePreview(file) {
      console.log(file);
    },
    //   tab切换事件
    async tabchange() {
      //    当tab切换到第二例
      if (this.active == 2) {
        // 先判断是否选了三级分类
        if (this.selectedOptions.length !== 3) {
          this.$message.warning("请先选择三级分类");
        }
        // 发送获取该分类的动态参数
        // :id	分类 ID	不能为空携带在url中
        // sel	[only,many]	不能为空,通过 only 或 many 来获取分类静态参数还是动态参数
        const res = await this.$http.get(
          `categories/${this.selectedOptions[2]}/attributes?sel=many`
        );
        // console.log(res);
        this.arrDtparams = res.data.data;

        // 遍历每一项,将attr_vals字符串转为数组
        this.arrDtparams.forEach(item => {
          // 并不是所有三级分类都有动态参数,如果是空字符串就不会转为数组,还是空字符串,但是v-for遍历空字符串会报错
          item.attr_vals =
            item.attr_vals == 0 ? [] : item.attr_vals.trim().split(",");
        });
      }
      // 当tab切换到第三列
      if (this.active == 3) {
        if (this.selectedOptions.length !== 3) {
          this.$message.warning("请先选择三级分类");
        }
        const res = await this.$http.get(
          `categories/${this.selectedOptions[2]}/attributes?sel=only`
        );
        console.log(res);
        this.arrStaParams = res.data.data;
      }
    },

    handleChange() {},

    //   获取所有商品分类的数据
    async getGoodCate() {
      const res = await this.$http.get(`categories?type=3`);
      //   console.log(res);
      this.options = res.data.data;
    }
  }
};
</script>

<style>
.alert {
  margin-top: 20px;
}
.step {
  margin-top: 20px;
}
.ql-editor{
    min-height: 250px;
}
</style>
