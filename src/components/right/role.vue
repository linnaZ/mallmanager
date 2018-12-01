<template>
  <el-card shadow="always" class="card">
    <my-bread level1="权限管理" level2="权限列表"></my-bread>
    <el-button plain class="addRol-btn">添加角色</el-button>
    <el-table :data="roleList" style="width: 100%" height="350px">
      <el-table-column width="100%" type="expand">
        <template slot-scope="scope">
          <!-- 一级权限的每一行   scope.row.children 每一个角色的一级权限 -->
          <el-row v-for="(item1,i) in scope.row.children" :key="i">
            <!-- 第一行的第一列  一级权限 -->
            <el-col :span="4">
              <!-- scope.row每一项角色-->
              <el-tag closable @close="delRight(scope.row,item1.id)">{{item1.authName}}</el-tag>
              <i class="el-icon-arrow-right"></i>
            </el-col>
            <!-- 第一行的第二列 -->
            <el-col :span="20">
              <!-- 二级权限的每一行 -->
              <el-row v-for="(item2,i) in item1.children" :key="i">
                <!-- 第一行的第二列的第一行的第一列  二级权限 -->
                <el-col :span="4">
                  <el-tag
                    type="warning"
                    closable
                    @close="delRight(scope.row,item2.id)"
                  >{{item2.authName}}</el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <!-- 第一行的第二列的第一行的第二列    三级权限 -->
                <el-col :span="20">
                  <el-tag
                    v-for="(item3,i) in item2.children"
                    :key="i"
                    type="info"
                    closable
                    @close="delRight(scope.row,item3.id)"
                  >{{item3.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <span v-if="scope.row.children.length==0" class="noneright">该角色没有任何权限</span>
        </template>
      </el-table-column>
      <el-table-column label="#" width="100%" type="index"></el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="120"></el-table-column>
      <el-table-column prop="roleDesc" label="角色描述" width="150"></el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle plain size="mini"></el-button>
          <el-button type="success" icon="el-icon-check" circle plain size="mini"
            @click="showRolDialogRight(scope.row)"
          ></el-button>
          <el-button type="danger" icon="el-icon-delete" circle plain size="mini"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 修改权限的对话框 -->
    <el-dialog title="分配权限" :visible.sync="dialogFormVisibleRight">
         <!--
          树形结构
          data->数据源 []
          show-checkbox -> 选择框
          node-key 每个节点的唯一标识 通常时data数据源中key名id
          default-expanded-keys 默认展开 [要展开的节点的id]
          default-checked-keys [要选择的节点的id]
          props 配置项 {label,children}
          label节点的文字标题和children节点的子节点
          值都来源于data绑定的数据源中的该数据的key名 'label'和'children'
           :default-expanded-keys="[2, 3]"
        :default-checked-keys="[5]"
         -->
      <el-tree
        :data="rightList"
        show-checkbox
        default-expand-all
        :default-checked-keys="checkArr"
        node-key="id"
        ref="tree"
        :props="defaultProps"
      ></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleadd = false">取 消</el-button>
        <el-button type="primary" @click="updateRight()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
        roleList: [],
        dialogFormVisibleRight: false,
        rightList:[],
        defaultProps: {
          children: 'children',
          label: 'authName'
        },
        checkArr:[],   //选中的权限的id数组
        roleId:1          //角色id
    };
  },
  mounted() {
    this.getallRole();
  },
  methods: {

    // 为角色设置新的权限
    async updateRight(){

      // 通过打开对话框的方法首先获取角色的id
      // :roleId	角色 ID	不能为空携带在url中
      // rids	权限 ID 列表	以 , 分割的权限 ID 列表
      // 获取全选的id的数组arr1 getCheckedKeys()
        const arr1=this.$refs.tree.getCheckedKeys()
      // 获取半选的id的数据arr2 getHalfCheckedKeys()
      const arr2=this.$refs.tree.getHalfCheckedKeys()
      // 将两个数组合并  并以,分割
      const str=[...arr1,...arr2].join(',')
      const res=await this.$http.post(`roles/${this.roleId}/rights`,{
        rids:str
      })
      // console.log(res)
      if(res.data.meta.status===200){
        this.dialogFormVisibleRight=false
       this.$message.success(res.data.meta.msg)
      }else{
        this.$message.warning(res.data.meta.msg)
      }
      
    },  

    // 显示分配权限的对话框
    async showRolDialogRight(role) {
      this.roleId=role.id
      this.dialogFormVisibleRight = true;
    // 获取所有权限
    const res=await this.$http.get(`rights/tree`)
    this.rightList=res.data.data

    let arrtemple=[]
    // 第一遍循环一级权限
    role.children.forEach(item1 => {
        // 第二遍循环二级权限
        item1.children.forEach(item2=>{
            // 第三遍循环三级权限  也是叶节点  只将叶节点的id存储到数组中为了解决半选问题
            item2.children.forEach(item3=>{
                arrtemple.push(item3.id)
            })
        })
    });

    this.checkArr=arrtemple


    },
    // 删除角色权限
    async delRight(role, rightId) {
      // roles/角色id/rights/权限id
      const res = await this.$http.delete(`roles/${role.id}/rights/${rightId}`);
      // console.log(res)
      // 返回当前角色所拥有的剩余权限
      role.children = res.data.data;
    },

    // 获取所有角色
    async getallRole() {
      const res = await this.$http.get("roles");
      // console.log(res)
      this.roleList = res.data.data;
      console.log(this.roleList);
    }
  }
};
</script>

<style>
.addRol-btn {
  margin-top: 10px;
}
.noneright {
  display: block;
  margin: 0 auto;
}
</style>
