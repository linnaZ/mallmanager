<template>
  <el-card shadow="always" class="card">
      <my-bread level1='权限管理' level2="权限列表"></my-bread>
    <el-table :data="rightList" style="width: 100%" stripe border height="480" class="rg-table">
      <el-table-column label="#" type="index"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="path" label="路径" width="180"></el-table-column>
      <el-table-column  label="层级">
          <template slot-scope="scope">
              <span v-if="scope.row.level==='0'">一级</span>
              <span v-if="scope.row.level==='1'">二级</span>
              <span v-if="scope.row.level==='2'">三级</span>
          </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
    data(){
        return {
            rightList:[],
       
        }
    },
    mounted(){
        this.getRightList()
    },
    methods:{

        async getRightList(){
            const res=await this.$http.get(`rights/list`)
            console.log(res)
            const {data,meta:{msg,status}}=res.data
            if(status===200){
                this.rightList=data
                
            }
        }
    }
};
</script>

<style>
.rg-table{
    margin: 10px 0px;
}
</style>
