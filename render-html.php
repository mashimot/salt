<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">


    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- Leave those next 4 lines if you care about users using IE8 -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
      <![endif]-->
</head>
<body>
    <div class="container">
    <?php 
        $bigAssJson = $_REQUEST['json_data'];
        $data = json_decode($bigAssJson, true);
    ?>
    <?php if (sizeof($data['pages']) > 0 && $data['type'] == 'tab'): ?>
    <ul  class="nav nav-pills">
        <?php foreach($data['pages'] as $pageIndex => $page): ?>
            <li <?php if($pageIndex == 0): ?> class="active" <?php endif ?> >
                <a href="#<?php echo $pageIndex ?>" data-toggle="tab"><?php echo $page['name']; ?></a>
            </li>
        <?php endforeach ?>
    </ul>
    <?php endif ?>
    <?php if (sizeof($data['pages']) > 0): ?>
       <?php if($data['type'] == 'tab'): ?>
            <div class="tab-content clearfix"> 
        <?php endif ?>
        <?php foreach($data['pages'] as $pageIndex => $page): ?>
            <?php if($data['type'] == 'tab'): ?>
                <div class="tab-pane <?php if($pageIndex == 0): ?> active <?php endif ?>" id="<?php echo $pageIndex ?>"> 
            <?php endif ?>
            <?php $rows = $page['rows']; ?>
            <section class="pages">
            <?php if (sizeof($rows) > 0): ?>
                <?php foreach($rows as $rowIndex => $row): ?>
                    <?php 
                        $columns = $row['columns'];
                        $grid = trim($row['grid']);
                        $gridArr = explode(" ", $grid);
                    ?>
                    <div class="row">                
                    <?php if (sizeof($columns) > 0): ?>
                        <?php foreach($columns as $columnIndex => $column): ?>
                        <div class="col-md-<?php echo $gridArr[$columnIndex] ?>">
                            <?php $da = $column['data']; ?>
                            <?php if (sizeof($da) > 0): ?>
                                <?php foreach($da as $dataIndex => $d): ?>
                                    <?php 
                                        $html   = $d['html']; 
                                        $table  = $d['table'];
                                    ?>
                                    <?php if($html): ?>
                                        <?php if($html['category'] == 'html'): ?>
                                            <?php if($html['tag'] == 'html'): ?>
                                                <?php echo $html['data'] ?>
                                            <?php endif ?>
                                            <?php if($html['tag'] == 'image'): ?>
                                                <img src="<?php echo $html['src'] ?>" class="img-responsive">
                                            <?php endif ?>
                                        <?php endif ?>                                 
                                        <?php if($html['category'] == 'form'): ?>
                                        <div class="form-group">
                                            <label for="i_<?php echo $table['column_name']; ?>"><?php echo $html['label'] ?></label>
                                            <?php if($html['tag'] == 'select'): ?>
                                            <select name="<?php echo $table['column_name'] ?>" id="i_<?php echo  $table['column_name'] ?>" class="form-control">
                                                <option value="">Selecione um Valor</option>
                                                <?php if(isset($html['elements']) AND count($html['elements'])): ?>
                                                <?php foreach($html['elements'] as $e): ?>
                                                    <option value="<?php echo $e['value'] ?>"><?php echo $e['text'] ?></option>
                                                <?php endforeach ?>
                                                <?php endif ?>
                                            </select>                                       
                                            <?php endif ?>

                                            <?php if($html['tag'] == 'radio'): ?>
                                                    <?php if(isset($html['elements']) AND count($html['elements'])): ?>
                                                        <?php foreach($html['elements'] as $e): ?>
                                                        <div class="radio">
                                                            <label><input type="radio" name="<?php echo $table['column_name'] ?>" value="<?php echo $e['value'] ?>"><?php echo $e['text'] ?></label>
                                                        </div>
                                                        <?php endforeach ?>
                                                    <?php endif ?>
                                            <?php endif ?>

                                            <?php if($html['tag'] == 'checkbox'): ?>
                                                <?php if(isset($html['elements']) AND count($html['elements'])): ?>
                                                    <?php foreach($html['elements'] as $e): ?>
                                                        <div class="checkbox">
                                                            <label><input type="checkbox" name="<?php echo $table['column_name'] ?>" value="<?php echo $e['value'] ?>"><?php echo $e['text'] ?></label>
                                                        </div>
                                                    <?php endforeach ?>
                                                <?php endif ?>
                                            <?php endif ?>

                                            <?php if($html['tag'] == 'text'):  ?>
                                            <input type="text" name="<?php echo $table['column_name'] ?>" value="" class="form-control">
                                            <?php endif ?>

                                            <?php if($html['tag'] == 'date'):  ?>
                                            <input type="text" name="<?php echo $table['column_name'] ?>" value="" class="form-control">
                                            <?php endif ?>

                                            <?php if($html['tag'] == 'textarea'):  ?>
                                            <textarea name="<?php echo $table['column_name'] ?>" value="" class="form-control"></textarea>
                                            <?php endif ?>

                                        </div>
                                        <?php endif ?>


                                        <?php if($html['category'] == 'table'): ?>
                                            <?php if(count($html['fields']) > 0): ?>
                                            <table class="table table-stripped">
                                                <thead>
                                                    <tr>
                                                        <?php foreach($html['fields'][0] as $key => $field): ?>
                                                        <th><?php echo $key ?></th>
                                                        <?php endforeach ?>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <?php foreach($html['fields'] as $field): ?>
                                                        <tr>
                                                            <?php foreach($field as $key => $f): ?>
                                                            <td><?php echo $field[$key] ?></td>
                                                            <?php endforeach ?>
                                                        </tr>
                                                    <?php endforeach ?>
                                                </tbody>
                                            </table>
                                            <?php endif ?>
                                        <?php endif ?> 


                                    <?php endif ?>
                                <?php endforeach ?>
                            <?php endif ?>
                        </div>
                        <?php endforeach ?>
                    <?php endif ?>
                    </div>
                <?php endforeach ?>
            <?php endif ?>
            </section>   
            <?php if($data['type'] == 'tab'): ?>
            </div>
            <?php endif ?>
        <?php endforeach ?>
        <?php if($data['type'] == 'tab'): ?>
        </div>
        <?php endif ?>
    <?php endif ?>
    </div>
    <!-- Including Bootstrap JS (with its jQuery dependency) so that dynamic components work -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
</body>
</html>